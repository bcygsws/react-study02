const path = require('path');
// 在内存中生成html页面
const htmlWebpackPlugin = require('html-webpack-plugin');
// 多次打包有不同版本之间的切换，安装clean-webpack-plugin可以自动删除上一次的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 单独抽取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 对css等样式文件进行压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js代码，使用插件uglifyjs-webpack-plugin
const UglifyJS = require('uglifyjs-webpack-plugin');
module.exports = {
	// 入口起点，可以指定多个入口。声明使用绝对路径，保证不出错
	// entry: path.resolve(__dirname, 'src/main.js'),
	// 抽离第三方包，entry改成一个对象
	entry: {
		app: path.resolve(__dirname, 'src/main.js'),
		vendors1: ['jquery']
	},
	// 输出配置
	output: {
		// 输出，只能指定一个输出路径
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[hash:8].js'
		// 相对于html页面，解析的输出目录
		// publicPath: '/'
		// 关于library和libraryTarget参考文档：https://segmentfault.com/a/1190000017960583
		// 事实上，你可以选择的选项有：
		// commonjs/commonjs2: 将你的library暴露为CommonJS模块
		// amd: 将你的library暴露为amd模块
		// umd: 将你的library暴露为所有的模块定义下都可运行的方式
		// library: 'my-library', // 导出库的名称
		// libraryTarget: 'umd' // 默认值是var,将组件库的入口起点设置为一个变量。assign则是生成一个全局变量
		// 配置输出模块的编码格式，umd表示universal module definition ，即支持所有情况的自定义，可以是var,window,global,umd等其他值
	},
	plugins: [
		new htmlWebpackPlugin({
			// 托管的模板
			template: path.resolve(__dirname, 'src/index.html'),
			// 托管后文件名仍叫做index.html
			filename: 'index.html',
			// 压缩html文件
			minify: {
				collapseWhitespace: true, // 去除空格
				removeComments: true, // 移除注释
				removeAttributeQuotes: true // 移除属性中的引号
			},
			// title设定打包后文档的标题
			title: '深入分析隔行变色案例'
		}),
		new CleanWebpackPlugin(),
		// 抽离样式文件插件,webpack4以前使用ExtractTextWebpackPlugin抽取样式
		new MiniCssExtractPlugin({
			// 将所有的css、less、sass文件抽离出来，放在根目录下(打包后的dist/下)，并依据下面格式命名
			filename: 'css/[name].[contenthash:8].css'
		}),
		// 压缩样式文件
		new OptimizeCssAssetsWebpackPlugin({
			cssProcessPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }]
			}
		})
	],
	// 抽离公共模块，包括第三方库和自定义库
	optimization: {
		splitChunks: {
			chunks: 'all', // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
			cacheGroups: {
				// 单独提取JS文件引入html
				vendors: {
					// 抽离第三方库
					// 键值可以自定义
					test: /[\\/]node_modules[\\/]/,
					// chunks: 'initial',
					name: 'vendors1', // 入口的entry的key
					// 小经验：filename：节点不仅可以设置打包文件名还可以设置打包路径，output节点中也是类似情况
					filename: 'js/jquery.js',
					enforce: true, // 强制
					priority: 10, // 抽离优先级,加了权重先抽离第三方模块
					minSize: 0, // 大于0字节
					minChunks: 1, //在分割之前，这个代码至少被引用1次
					reuseExistingChunk: true
				}
			}
		},
		// 为 webpack 运行时代码创建单独的chunk
		runtimeChunk: {
			name: 'manifest'
		},
		// 压缩js
		minimizer: [
			new UglifyJS({
				include: /\.js$/,
				parallel: true, // 采用多线程并发
				uglifyOptions: {
					output: {
						comments: false // 删除代码中的注释
					}
				}
			})
		]
	},
	module: {
		rules: [
			// 配置解析样式或其他文件的loader
			// .css文件
			{
				test: /\.css$/,
				// style-loader换成MiniCssExtractPlugin.loader后即可完成对css的抽离
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
							importLoaders: 2
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader',
						// 参考文档：https://blog.csdn.net/m0_45315697/article/details/106446801
						options: {
							// url设定为false,webpack不会解析url中路径,会产生一个问题。本案例中add.less中有一个url路径，路径引用了图片。
							// 后面再打包图片时，图片名称中用到了hash。因此，解析add.less文件中options url必须为true,如果在sass和css中有类似
							// url的路径,毫无疑问，也必须让options选项中url为true
							url: true,
							importLoaders: 2 // 就算使用import样式，也会执行会面的loader
							// modules: true,
							// localIdentName: '[local]--[hash:base64:5]',
							// import: true,
							// url: true, //启用url，默认true，如果设置false，则页面只是默认样式
							// import: true, //禁止或启用@import, 默认true
							// minimize: false, //压缩css代码, 默认false
							// 注意 : minimize这个属性移除了，这里设置不生效。
							// 如果要对css代码压缩，可以使用插件optimize-css-assets-webpack-plugin
							//  root: '/', //修改css中url指向的根目录, 默认值为/, 对于绝对路径, css-loader默认是不会对它进行处理的
							// modules: false, //开启css-modules模式, 默认值为flase
							// localIdentName: ‘[name]-[local]-[hash:base64:5]‘, //设置css-modules模式下local类名的命名
							// camelCase: false, //导出以驼峰化命名的类名, 默认false
							// sourceMap: false, //禁止或启用sourceMap, 默认false
							// importLoaders: 0, //在css-loader前应用的loader的数目, 默认为0
							// alias: {} //起别名, 默认{}
						}
					},
					// 需要配合postcss.config.js里面的autoprefixer使用
					// autoprefixer为样式添加前缀，压缩css文件等都需要postcss-loader
					'postcss-loader',
					'less-loader'
				]
			},
			// 处理index.html中的图片：webpack解析html标签中img引入的图片
			// 参考文档：https://www.cnblogs.com/fightjianxian/p/12441638.html
			{
				test: /\.(html|htm)$/i,
				// use: 'html-withimg-loader'
				// html-loader解析图片，依据的是项目中原来index.html<img src="./images/bale.jpg"/>的位置；而html-withimg-loader则依据的是托管在内存中的根路径
				use: {
					loader: 'html-loader'
				}
			},
			// url-loader和file-loader是什么关系呢？简答地说，url-loader封装了file-loader。url-loader不依赖于
			// file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader
			// 内置了file-loader。通过上面的介绍，我们可以看到，url-loader工作分两种情况：1.文件大小小于limit参数，
			// url-loader将会把文件转为DataURL；2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会
			// 直接传给file-loader。因此我们只需要安装url-loader即可
			// 处理css中的url图片，webpack解析css路径中的url图片。图片压缩和浏览器加前缀还要用到file-loader，因此file-loader
			// 最好也安装一下
			{
				test: /\.(jpeg|bmp|png|jpg|gif)$/i,
				use: [
					{
						// 图片大小126428
						loader: 'url-loader',
						options: {
							esModule: false, // 新版file-loader使用了ES Module模块化方式，为避免和html-loader采用的common.js冲突，
							// 将esModule配置为false就可以解决这个问题
							outputPath: './images',
							// publicPath: '../images', // 必须有，否则打包时，抽离的样式中url(/images)图片变成了和css同级了
							// child.jpg图片大写为213,721
							// limit: 214000, // 图片大小小于limit,图片转化为base64格式
							limit: 120 * 1024, // 图片的大小1个为123k,一个为208k。取两个最小值。limit小于最小值，才会打包成图片需要安装file-loader，limit<图片实际值，才会显示name格式的名字
							name: '[name]-[hash:8].[ext]'
						}
					}
					// {
					// 	loader: 'image-webpack-loader',
					// 	options: {
					// 		mozjpeg: {
					// 			progressive: true
					// 		},
					// 		// optipng.enabled: false will disable optipng
					// 		optipng: {
					// 			enabled: false
					// 		},
					// 		pngquant: {
					// 			quality: [0.65, 0.9],
					// 			speed: 4
					// 		},
					// 		gifsicle: {
					// 			interlaced: false
					// 		},
					// 		// the webp option will enable WEBP
					// 		webp: {
					// 			quality: 75
					// 		}
					// 	}
					// }
				]
			},
			// 解析js或者jsx文件的新语法
			{
				test: /\.js(x?)$/,
				use: {
					loader: 'babel-loader'
				},
				// 排除node_modules
				exclude: /node_modules/
			}
		]
	}
};
