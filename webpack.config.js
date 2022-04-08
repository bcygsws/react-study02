const path = require('path');
// 在内存中生成html页面
const htmlWebpackPlugin = require('html-webpack-plugin');
// 多次打包有不同版本之间的切换，安装clean-webpack-plugin可以自动删除上一次的打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 单独抽取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 对css等样式文件进行压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js代码uglifyjs-webpack-plugin
const UglifyJS = require('uglifyjs-webpack-plugin');
// gzip压缩,开发模式下关闭
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
	mode: 'development',
	// 入口起点，可以指定多个入口。声明使用绝对路径，保证不出错
	// entry: path.resolve(__dirname, 'src/main.js'),
	// 抽离第三方包，entry改成一个对象
	entry: {
		app: path.resolve(__dirname, 'src/main.js'),
		vendors: [
			'react',
			'react-dom',
			'react-router-dom',
			'react-loadable',
			'prop-types',
			'redux',
			'react-redux',
			'redux-thunk',
			'nprogress'
		],
		antd1: 'antd',
		axios: 'axios',
		// 体积较大的包单独抽离
		react_player: 'react-player'
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
			// 组块
			// chunks: ['vendors', 'commons', 'index'],
			// 压缩html文件
			minify: {
				collapseWhitespace: true, // 去除空格
				removeComments: true, // 移除注释
				removeAttributeQuotes: true // 移除属性中的引号
			}
		}),
		new CleanWebpackPlugin(),
		// 抽离样式文件插件,webpack4以前使用ExtractTextWebpackPlugin抽取样式
		new MiniCssExtractPlugin({
			// 将所有的css、less、sass文件抽离出来，放在根目录下(打包后的dist/下)，并依据下面格式命名
			filename: 'css/[name].[contenthash:8].css'
		}),
		// 压缩样式文件
		new OptimizeCssAssetsWebpackPlugin({
			// 配置css处理插件选项
			cssProcessPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }]
			}
		})
		// gzip压缩，开发环境中关闭
		// 还需要在nginx中配置gzip压缩相关的内容，参考：https://ly1024.blog.csdn.net/article/details/109580024?spm=1001.2101.3001.6650.12&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-12.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-12.pc_relevant_default&utm_relevant_index=17
		// new CompressionWebpackPlugin({
		//	// filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
		// 总结：解决命名冲突，不再是所有文件公用一个.gz文件，而是为每个满足条件(具体说threshold中的设定值，大于1M的才会gzip压缩)
		// 的打包js文件，都生成一个同名的.gz文件
		// filename: '[path][base].gz', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
		// 	algorithm: 'gzip', // 算法
		// 	test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
		// 	threshold: 10240, // 只处理比这个值大的资源。按字节计算
		// 	minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
		// })
	],
	// 抽离公共模块，包括第三方库和自定义库
	optimization: {
		// minimize: true, // webpack4默认是开启压缩的，可以不写
		splitChunks: {
			chunks: 'all', // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
			automaticNameDelimiter: '~',
			minSize: 30000, // js文件之和大于30000，就会拆分。之和小于30000，这些文件会被打包成一个文件
			cacheGroups: {
				// 单独提取JS文件引入html
				vendors: {
					// 抽离第三方库
					chunks: 'all',
					// 键值可以自定义
					test: /^(react|react-dom|react-router-dom|prop-types|react-loadable|redux|react-redux|redux-thunk|nprogress)$/,
					// test: /[\/]node_modules[\/]/,
					// test: (module) =>
					// 	/react/.test(module.context) ||
					// 	/react-dom/.test(module.context) ||
					// 	/react-router-dom/.test(module.context) ||
					// 	/prop-types/.test(module.context),
					// enforce: true, // 强制
					name: 'vendors', // 入口的entry的key
					minChunks: 1, //在分割之前，这个代码至少被引用1次
					priority: 100 // 抽离优先级,加了权重先抽离第三方模块
					// 小经验：filename：节点不仅可以设置打包文件名还可以设置打包路径，output节点中也是类似情况
					// filename: 'js/vendors1.js',
					// reuseExistingChunk: true
				},
				// antd包单独抽离
				antd1: {
					test: (module) => /antd/.test(module.context),
					// test: /^antd$/,
					minChunks: 1,
					name: 'antd1',
					// enforce: true, // 强制
					priority: 100
				},
				react_player: {
					test: /^react-player$/,
					minChunks: 1,
					name: 'react_player',
					priority: 100
				},
				axios: {
					test: /^axios$/,
					minChunks: 1,
					name: 'axios',
					priority: 100
				},
				'async-chunks': {
					chunks: 'async',
					minChunks: 1, // minChunks最少引用的次数，是1次
					name: 'async-chunks',
					priority: 80
				},
				// 其他公共包
				commons: {
					chunks: 'all',
					minChunks: 1,
					name: 'commons',
					priority: 70
				}
			}
		},
		// 为 webpack 在客户端运行时，会首先加载webpack相关的代码，例如：require函数等，这部分代码会随着业务代码的修改
		// 而变化（存储了chunk id等信息）。如果不抽取出来，这些代码会打包到vendor中，导致vendor每次都要被用户重新加载
		runtimeChunk: {
			name: 'manifest'
		},
		// 压缩js
		minimizer: [
			new UglifyJS({
				include: /\.js$/,
				parallel: true, // 采用多线程并发,[ˈpærəlel]
				uglifyOptions: {
					output: {
						comments: false // 删除代码中的注释
					}
				}
			})
		]
	},
	// externals中配置了【从输出的bundle.js中排除依赖】的方法
	// externals: {
	// 	react: 'React',
	// 	'react-dom': 'ReactDOM',
	// 	antd: 'antd',
	// 	moment: 'moment'
	// },
	module: {
		rules: [
			// 配置解析样式或其他文件的loader
			// .css文件
			// 在一个项目中，一般自定义样式使用less和scss，因为这两种方式书写样式代码更简洁。为了避免样式的覆盖问题，可以开启模块化，导入
			// 样式时，带上一个对象。而对于css文件本身，通常不建议开启模块化，原因是：一些第三方库中依赖的样式文件是.css文件，对.css文件
			// 开启模块化，可能会影响第三方库组件的显示效果
			// 方式2：当然也可以写两个关于css文件的解析规则：
			// {test:/\.css$/,include:/node_modules/,use:[MiniCssExtractPlugin.loader,'css-loader']}
			// {test:/\.css$/,exclude:/node_modules/,use:[MiniCssExtractPlugin.loader,{loader:'css-loader',options:{modules:true,localIdentName:'[local]--[hash:base64:5]'}}]}
			// 注意：模块化只针对id和类选择器起作用，对标签选择器不起作用。同时，冠以:global的全局样式，也不会被模块化
			// 详情：参考https://www.cnblogs.com/guolao/p/11830098.html
			{
				test: /\.css$/,
				// style-loader换成MiniCssExtractPlugin.loader后即可完成对css的抽离
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
						// options: {
						// 	modules: true,
						// 	localIdentName: '[local]--[hash:base64:5]'
						// }
					}
				]
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
							importLoaders: 2,
							// // 如果没有启用模块化，那么通过这种方式接收的MyList是一个空对象{}。import MyList from './css/list.scss';
							modules: true,
							localIdentName: '[local]--[hash:base64:5]'
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
							importLoaders: 2, // 就算使用import样式，也会执行会面的loader
							modules: true,
							// local原来的的类名，hash:5 5位的hash字符，name代表样式表文件的名称
							localIdentName: '[local]--[hash:base64:5]'
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
			// // 处理index.html中的图片：webpack解析html标签中img引入的图片
			// // 参考文档：https://www.cnblogs.com/fightjianxian/p/12441638.html
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
			/**
			 *
			 * bug:html中的图片和样式文件url路径中的图片的路径纠缠：
			 * 注意：html-loader中处理的是打包前路径的相对关系
			 * a.因此index.html中图片中src="./images/bale.jpg"。打包后，图片仍然放在了images文件夹中了，路径相对关系不变。
			 * 由于html-loader处理了html中的图片仍然要走url-loader加载器，那么url-loader之后的options选项中就不能配置
			 * publicPath:'../images'(如果项目中仅仅css中有引入图片，完全可以这么做)或者../来调和打包后图片的路径
			 * b.如果是html和css中都存在图片,html中图片路径相对位置不变，而且处理html中图片的html-loader处理完成后，还要
			 * 交给url-loader处理，比如outPath:'./images',指示两种图片都打包在dist/images文件夹下。同时，limit(取两个图片大
			 * 小的最小值both_min，limit<最小值box_min,就可以实现图片都不打包成base64格式)。
			 * url中引入的图片路径：打包前url('../images/child.jpg') ，打包后url被解析成了url('/images/child.jpg')。需要提高
			 * 访问级别，在rules:[],{test:/\.less$/,use:{
			 * 		loader:MiniCssExtractPlugin.loader,
			 * 		options:{
			 * 		      // 将被url-loader处理器降低访问层级后的图片，访问级别抬高，即解析后的/images/child.jpg变成../images/child.jpg
			 * 					publicPath:'../'
			 * 						}
			 * }}
			 */
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
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4
							},
							gifsicle: {
								interlaced: false
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					}
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
	},
	// 开发服务配置
	devServer: {
		// port: '3002',
		progress: true, // 显示加载进度条
		contentBase: './dist', // 映射地址
		compress: true // 是否压缩
	},
	resolve: {
		alias: {
			'@ant-design/icons/lib/dist': path.resolve(
				__dirname,
				'src/utils/icons.js'
			)
		}
	}
};
