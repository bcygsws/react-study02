import React from 'react';
import DivCom from '../components/fat_toson/DivCom.jsx';
// 导入Hello2组件
import Hello2 from '../components/fat_toson/Hello2.jsx';
// 导入渲染的循环列表组件List
import List from '../components/list/List.jsx';
// 导入计数器组件
import Counter from '../components/counter/Counter.jsx';
import Fat17 from '../components/counter/Fat17.jsx';
import Parent from '../components/receiveProps/TestReceiveProps.jsx';
import ThisBind from '../components/bind/ThisBind.jsx';
import ServalWays from '../components/comunication/ServalWays.jsx';
import Comment from '../components/comment/Comment.jsx';
import MyContext from '../components/context/Context.jsx';
import Count from '../components/redux/Count.jsx';
import Person from '../components/redux/Person.jsx';
// 导入Salary组件
import Salary from '../components/redux/Salary.jsx';
// 导入演示forwardRef的UseRef组件
import UseRef from '../components/use_ref/UseRef.jsx';
import { Link, Route, Switch } from 'react-router-dom';
// 导入查询参数，query或者search所需要的组件UseQuery
import UseQuery from '../components/route/UseQuery.jsx';
// 导入电影列表组件Film-体会nprogress的使用
import Film from '../components/nprogress/Film.jsx';
// 视频播放器组件演示
import MyVideo from '../components/player/MyVideo.jsx';
// 十五、react-router v4和v5版本的比较
import UsingRouter from '../components/router_version/UsingRouter.jsx';
// 十六、React16.4以后生命周期钩子getDerivedStateFromProps
import NewCircle from '../components/new_circle/NewCircle.jsx';
// 导入样式
import RouteStyle from '../css/route.less';
/**
 *
 * @ antd ui库的使用：
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

// 导入Context组件
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			person: {
				name: '张三',
				age: 15,
				gender: '男',
				address: '上海'
			},
			info: '这是向Hello2子组件传递的数据'
		};
	}
	render() {
		return (
			<div className={RouteStyle.container}>
				<h3>这是Home组件</h3>
				{/* 文件夹fat_toson */}
				<Link to="/home/div_com">
					一、父组件给子组件DivCom绑定属性person
				</Link>
				{/* 文件夹fat_toson */}
				<Link to="/home/hello2">
					二、父组件给子组件Hello2绑定属性person和info
				</Link>
				{/* 文件夹list */}
				<Link to="/home/list">
					三、评论列表的渲染Array.map()的返回值还是数组
				</Link>
				{/* 文件夹counter */}
				<Link to="/home/counter">
					四、计数器案例-体会defaultProps默认属性和类型校验，以及生命周期钩子
				</Link>
				<Link to="/home/counter17">
					四、计数器案例-体会React17生命周期钩子
				</Link>
				{/* receiveProps文件夹 */}
				<Link to="/home/receive_props">
					五、演示生命周期钩子componentWillReceiveProps
				</Link>
				{/* communication文件夹 */}
				<Link to="/home/com">六、React组件通信方法汇总</Link>
				{/* context文件夹 */}
				<Link to="/home/context">
					七、Context特性：getChildContextProps，前三、后三、后二
				</Link>
				{/* bind文件夹 */}
				<Link to="/home/bind">八、绑定this的三种方式</Link>
				{/* 文件夹comment  */}
				<Link to="/home/comment">
					九、手动添加评论，实时显示评论列表
				</Link>
				{/* Redux文件夹 */}
				<Link to="/home/redux">
					十、同级组件Count和Person之间共享状态
				</Link>
				<Link to="/home/useRef">
					使用forwardRef演示ref的使用，并体会高阶组件
				</Link>
				<Link to="/home/use_query?name='张三'">查询参数的获取</Link>
				{/* <Link
					to={{
						pathname: '/home/use_query',
						query: { name: '张三' }
					}}
				>
					查询参数的获取
				</Link> */}
				{/* <Link
					to={{
						pathname: '/home/use_query',
						state: { name: '张三' }
					}}
				>
					查询参数的获取
				</Link> */}
				<Link to="/home/film">电影列表-体会插件nprogress的使用</Link>
				{/* 视频播放器-第三方插件，jol-player */}
				<Link to="/home/play_video">
					第三方视频播放器插件react-player的使用
				</Link>
				<Link to="/home/router_version">
					十五、比较react-router的版本v4和v5
				</Link>
				<Link to="/home/new_circle">
					十六、React16.4以后，getDerivedStateFromProps生命周期钩子的理解
				</Link>
				<Switch>
					{/* 父组件给子组件传值显示，DivCom组件和Hello2组件 */}
					<Route
						path="/home/div_com"
						component={() => (
							<DivCom {...this.state.person}></DivCom>
						)}
					></Route>
					{/* 特别注意：如果Hello2中使用name作为子组件Hello2的接收名称，然后person对象结构：name={this.state.person.name}，
					出现了重名的绑定属性名，则对象中的解构的name覆盖前面字符串的name。
					总结：父组件给子组件绑定属性时，如果出现重名的键，包括一个是属性，一个是对象解构出来的键名，出现重名。那么，规律是写在
					后面传递的属性值，覆盖前面的属性值 */}
					<Route
						path="/home/hello2"
						component={() => (
							<Hello2
								info={this.state.info}
								{...this.state.person}
							></Hello2>
						)}
					></Route>
					{/* <Route
						path="/home/hello2"
						component={() => (
							<Hello2
							{...this.state.person}
								name={this.state.info}
							></Hello2>
						)}
					></Route> */}
					<Route path="/home/list" component={List}></Route>
					<Route
						path="/home/counter"
						component={() => <Counter initVal={0}></Counter>}
					></Route>
					<Route path="/home/counter17" component={Fat17}></Route>
					<Route path="/home/com" component={ServalWays}></Route>
					<Route
						path="/home/receive_props"
						component={Parent}
					></Route>
					{/* Context的用途，getChildContextProps 记忆：前三、后三、后二，1方法，两静态属性 */}
					<Route path="/home/context" component={MyContext}></Route>
					<Route path="/home/bind" component={ThisBind}></Route>
					{/* 评论列表案例 */}
					<Route path="/home/comment" component={Comment}></Route>
					<Route
						path="/home/redux"
						component={() => {
							return (
								<div>
									<Count></Count>
									<Person></Person>
									<Salary></Salary>
								</div>
							);
						}}
					></Route>
					<Route path="/home/useRef" component={UseRef}></Route>
					<Route path="/home/use_query" component={UseQuery}></Route>
					<Route path="/home/film" component={Film}></Route>
					<Route path="/home/play_video" component={MyVideo}></Route>
					<Route
						path="/home/router_version"
						component={UsingRouter}
					></Route>
					<Route
						path="/home/new_circle"
						component={NewCircle}
					></Route>
				</Switch>
				{/* 计数器组件，注释掉下面一行。不为initVal传默认属性，让它走defaultProps这个途径，获取默认值 */}
				{/* <Counter initVal="3"></Counter> */}
				{/* a.不传值，走defaultProps  */}
				{/* 	<Counter></Counter> */}
				{/* b.传递了值，但是该值是字符串，和数字1相加，成了拼接字符串。这个时候需要在Counter中对数据类型，进行【类型校验】*/}
				{/* <Counter initVal="的确传值了，但是传递的是个字符串哈哈哈"></Counter> */}
				{/* c.同样错误，这样传值，在state:props.initVal接收后，得到的值是字符串类型，传number,应该使用initVal={3} */}
				{/* <Counter initVal="3"></Counter> */}
				{/* 子组件给父组件传值的两种方式 */}
				{/* <Fat></Fat> */}
			</div>
		);
	}
}
