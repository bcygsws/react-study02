import React from 'react';
import DivCom from '../components/DivCom.jsx';
// 导入Hello2组件
import Hello2 from '../components/Hello2.jsx';
// 导入渲染的循环列表组件List
import List from '../components/List.jsx';
// 导入计数器组件
import Counter from '../components/Counter.jsx';
import Parent from '../components/TestReceiveProps.jsx';
import BindThis from '../components/ThisBind.jsx';
import Fat from '../components/SonToFat.jsx';
import Comment from '../components/Comment.jsx';
import MyContext from '../components/context/Context.jsx';
// 按需导入路由导航需要的组件
import { Route, Link } from 'react-router-dom';
// 导入查询参数，query或者search所需要的组件UseQuery
import UseQuery from '../components/route/UseQuery.jsx';
// 导入样式
import RouteStyle from '../css/route.less';
/**
 *
 * @antd ui库的使用：
 * 参考文档：https://3x.ant.design/docs/react/introduce-cn
 * 第一步：import { DatePicker } from 'antd';
 *	ReactDOM.render(<DatePicker />, mountNode);
 *
 * 第二步：导入antd（@4.16.13）。所依赖的样式：import 'antd/dist/antd.css';
 *
 * 按需加载也有两种方式
 * 1.安装插件，babel-plugin-import。版本（@1.13.3）然后在.babelrc文件中配置，此种方法无需再引入样式文件，也可以按需加载
 * {
 *		"plugins": [
 *    		["import", {
 *      "libraryName": "antd",
 *      "libraryDirectory": "es",
 *      "style": "css" // `style: true` 会加载 less 文件
 *   			 }]
 *  		]
 *		}
 *
 * 2.只导入datapick文件的js和css样式，也是按需导入
 *
 * 在About.jsx组件中验证
 *
 * 牢记：
 * 1.在我们书写第三方样式时，适宜使用less或者scss,这两种文件书写样式也更简洁，然后专门为less和scss样式开启模块化
 * 2.而对于css文件，一般第三方库，比如antd导入库依赖的样式时，样式文件一般是css文件，如果开启模块化，将影响库中的组件渲染
 * 的效果。因此，样式文件，使用的大致方针是：
 * a.自定义文件，使用less或者scss,并开启模块化
 * b.第三方库依赖的样式文件，一般是css文件，在webpack配置文件中不要为css文件开启模块化
 *
 *
 *
 *
 */
// 优化
// 1.按需导入组件
//  让我们看看现在流行的动态导入工具库：react-loadable。它基础封装了未来JS的新语法import()。
// const GenerateTags = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "generateTags" */ "./GenerateTags"),
//     loading: LoadingSpinner
// });
// 2.@babel/runtime-corejs2,按需引入，即需要使用新特性，打包什么新特性，减小打包的体积
// 参考文档1：
// 参考文档2；https://lequ7.com/guan-yu-javascript-qian-duan-ye-mian-liu-lan-qi-jian-rong-wen-ti-de-jie-jue.html
// useBuildIns，蕴含三个取值entry、usage、false。
// entry，在入口文件引入全副的polyfill。长处是彻底解决兼容问题，毛病是导致最终代码体积比拟大。
// usage，依据代码的应用状况引入polyfill。长处是按需引入代码体积减小很多，毛病是node_modules中的高版本javascript检测不进去，引入不了polyfill。
// false，不增加polyfill也不解决兼容问题。
// 能够看到三个值都有一些毛病，须要一种既能按需引入又能解决node_modules中兼容问题的计划
// @babel/runtime只能处理关键字，然而@babel/runtime-corejs2在此基础上还能处理Promise以及新的
// 原生方法（比如：string.padStart）。因此，我们使用@babel/runtime-corejs2就无需使用@babel/runtime了

let person = {
	name: '张三',
	age: 15,
	gender: '男',
	address: '上海'
};
let info = '这是向Hello2子组件传递的数据';
// 导入Context组件
export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={RouteStyle.container}>
				<h3>这是Home组件</h3>
				<Link to="/home/use_query?name='张三'">查询参数的获取</Link>
				{/* 	<Link
					to={{
						pathname: '/home/use_query',
						query: { name: '张三' }
					}}
				>
					查询参数的获取
				</Link> */}
				{/* 	<Link
					to={{
						pathname: '/home/use_query',
						state: { name: '张三' }
					}}
				>
					查询参数的获取
				</Link> */}
				<Route path="/home/use_query" component={UseQuery}></Route>
				<DivCom {...person}></DivCom>
				<Hello2 info={info} {...person}></Hello2>
				<List></List>
				{/* 计数器组件，注释掉下面一行。不为initVal传默认属性，让它走defaultProps这个途径，获取默认值 */}
				{/* <Counter initVal="3"></Counter> */}

				{/* a.不传值，走defaultProps  */}
				{/* 	<Counter></Counter> */}

				{/* 传递了值，但是该值是字符串，和数字1相加，成了拼接字符串。这个时候需要在Counter中对数据类型，进行【类型校验】*/}
				{/* <Counter initVal="的确传值了，但是传递的是个字符串哈哈哈"></Counter> */}
				{/* 同样错误，这样传值，在state:props.initVal接收后，得到的值是字符串类型，传number,应该使用initVal={3} */}
				{/* <Counter initVal="3"></Counter> */}
				<Counter initVal={0}></Counter>
				{/* 单独演示生命周期钩子componentWillReceiveProps */}
				<Parent></Parent>
				<BindThis></BindThis>
				{/* 子组件给父组件传值的两种方式 */}
				<Fat></Fat>
				{/* 评论列表案例 */}
				<Comment></Comment>
				{/* Context的用途，getChildContextProps 记忆：前三、后三、后二，1方法，两静态属性 */}
				<MyContext></MyContext>
			</div>
		);
	}
}
