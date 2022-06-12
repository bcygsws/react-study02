import React from 'react';
// 导入react-router相关的包，web中使用react-router-dom,可以根据是开发web还是App，选择安装不同的包
// 按需导出常用的三个
import { HashRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import AppStyle from './css/app.less';
import loadable from './utils/loadable.js';
// 导入views中的三个子组件
import Home from './views/Home.jsx';
// Home是主页一开始默认显示，Movie和About组件，使用react-loadable包动态导入
const Movie = loadable(() => import('./views/Movie.jsx'));
const About = loadable(() => import('./views/About.jsx'));
// 引入DatePicker依赖的样式,在App.jsx文件中引入，安装并配置插件babel-plugin-import按需导入antd组件库
// import 'antd/dist/antd.css';
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<HashRouter>
				<div className={AppStyle.app_container}>
					<h3>这是App根组件</h3>
					{/* 创建三个超链接 */}
					<NavLink to="/home" activeClassName={AppStyle.selected}>
						首页
					</NavLink>
					{/* 	<Link to="/movie">电影</Link> */}
					{/* 1.默认路由规则中的匹配时模糊匹配的，Route 中/movie对应Movie中。若将Link中的路由改为to="/movie/top250/10"，
        仍可以匹配movie组件 */}
					{/* 2.那么如何精确匹配呢？只需要在Route规则中响应位置添加属性exact即可，验证：/movie/top250/10 不能匹配到Movie组件了 */}
					{/* 3.在Route规则中也配置参数，才能重新匹配Movie */}
					<NavLink
						to="/movie/top250/10"
						activeClassName={AppStyle.selected}
					>
						电影
					</NavLink>
					<NavLink to="/about" activeClassName={AppStyle.selected}>
						关于
					</NavLink>
					{/* 在同一时刻，只渲染一个组件，使用Switch标签包裹所有Route路由规则 */}
					{/* v3 v4可以使用Route标签嵌套来实现路由嵌套，v5版本路由嵌套
					参考文档：https://blog.csdn.net/Vue2018/article/details/100559895?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-2-100559895.pc_agg_new_rank&utm_term=hashrouter+%E5%B5%8C%E5%A5%97&spm=1000.2123.3001.4430 */}
					<Switch>
						<Route path="/home" component={Home}></Route>
						{/* 4.那么如何获取Route路由规则中的参数呢？现在render函数中打印一下组件实例this */}
						<Route
							path="/movie/:type/:id"
							component={Movie}
							exact
						></Route>
						<Route path="/about" component={About}></Route>
						{/* 由根路径，重定向到/home配置Route，注意Redirect是单标签;vue中重定向也是用redirect,不过是小写单词*/}
						<Redirect from="/" to="/home" exact />
					</Switch>
				</div>
			</HashRouter>
		);
	}
}
/**
 * @ HashRouter表示一个路由根容器，将来所有路由相关的东西都要包裹在里面，一个网站中HashRouter只出现一次
 * Route 路由规则
 * 两个参数：
 * path="/"
 * component={组件名称}
 *
 * 关于Link
 * 参考文档：https://blog.csdn.net/lhjuejiang/article/details/80366839
 * Link表示一个路由链接，类似Vue router-link。NavLink是Link的一个特定版，可以对路由进行修饰，
 * a.有activeClassName和activeStyle来美化选中的那个路由
 * b.isActive(function(){})链接是否激活的额外业务逻辑，例如：奇数时激活
 *
 * 1.在src中创建一个根组件App，并导入到main.js中，与此同时App当做ReactDom.render(<App</App>)
 * 2.在App.jsx中按需导入,$ import {HashRouter,Route,Link} from 'react-router-dom';
 * 3.将App.jsx中的顶层div上加上一对HashRouter标签,HashRouter中只能出现一个根元素，上面组件中的div。HashRouter本身不会解析成
 * 任何元素标签,Link默认解析成了a，to="/home",默认解析成了href="#/home"
 * 4.Route除了是一个规则匹配，还时组件填充的占位符
 *
 *
 *
 *
 *
 *
 */
