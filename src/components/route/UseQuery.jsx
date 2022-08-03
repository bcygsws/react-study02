/**
 * @ search传参：参数会出现在地址栏，this.props.location.search拿到一个字符串类似：?name='%E5%BC%A0%E4%B8%89'，刷新页面后参数保持
 * 方式一、search传参：<Link to="/home/use_query?name='张三'">查询参数的获取</Link>
 * 接收参数：this.props.location.search得到的是一个字符串
 * 地址栏：http://localhost:3002/#/home/use_query?name='%E5%BC%A0%E4%B8%89'
 *
 * 方式二、query传参：参数不会出现在地址栏，this.props.location.query拿到一个对象，{name:'张三'}，刷新页面还有参数消失
 * <Link to={{pathname: '/home/use_query',query: { name: '张三' }}}>查询参数的获取</Link>
 * 接收参数：this.props.location.query得到一个对象，{name:'张三'},页面刷新，参数消失
 * 地址栏：http://localhost:3002/#/home/use_query
 *
 * 方式三：state隐式传参：参数不会出现在地址栏，在HistoryRouter中刷新页面，参数保持。但是，在HashRouter中刷新页面参数消失
 * 	<Link to={{pathname: '/home/use_query',state: { name: '张三' }}}>查询参数的获取</Link>
 * 接收参数：this.props.location.state 拿到一个对象 {name:'张三'}，在HashRouter中，刷新当前页面，参数消失
 * 地址栏：http://localhost:3002/#/home/use_query
 *
 *
 * 三种方式：各有缺点，建议使用match参数（而不是上面三种location参数），props.match.params.id这种传参方式
 * 对比：vue的路由参数
 * 参考文档：https://blog.csdn.net/michiko98/article/details/118438590
 *
 *
 * hash模式和history模式的区别和联系
 * hash模式
 * 参考文档：https://blog.csdn.net/luanhaiyang/article/details/50731919
 * window.location.hash 获取其值
 * a.#叫做哈希符或者叫做锚点
 * b. 如果url是：……login/#/abc hash值是#/abc
 * c.hash值不会包括在http请求中，对后端完全没有影响，因此改变hash不会重载页面
 * d.原理上不同：hash模式使用onhashchange监听hash值的变化
 *
 * history模式
 * a.为了使url更美观，更规范，不使用#
 * b.使用场景：在使用vue或者react来开发分享到另外一个应用的分享页面时，不允许使用#，因此必须使用history模式
 * c.history模式使用h5的pushState和replaceState方法，这两个方法会导致history对象的变化，从而改变当前地址栏的url，而不会向
 * 后端发起请求，也不会触发popState事件的执行(popState事件在点击浏览器的前进或后退按钮时触发)
 * d.缺点：在访问url的二级页面时，刷新页面时，会报404错误；这就需要后端配合，配置Apache或者nginx服务器，配置url重定向到首页，
 * 就ok了
 * e.location的state参数，唯独在history模式下，刷新页面，参数不消失
 *
 * 参考文档：https://zhuanlan.zhihu.com/p/337073166
 * 参考文档1：https://blog.csdn.net/weixin_51396911/article/details/123866875
 *
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Receive from './Receive.jsx';
export default class UseQuery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// 方式一：拿到了一串%字符，例如：?name='%E5%BC%A0%E4%B8%89'，刷新页面参数不消失
			name: props.location.search // 拿到了一串字符
			// 方式二：直接拿到了汉字，页面刷新，参数消失
			// name: props.location.query.name // 直接拿到了汉字"张三"
			// 方式三：state隐式传参，页面刷新，参数
			// name: props.location.state.name
		};
	}
	navHandle = () => {
		this.props.history.push('/home/use_query/4');
	};
	render() {
		console.log(this);
		return (
			<div>
				<h3>这是查询参数获取组件</h3>
				{/* 渲染查询参数到页面 */}
				<p>{this.state.name}</p>
				<p>{decodeURI(this.state.name)}</p>
				<button onClick={this.navHandle}>
					点击按钮，跳转至Receive页面
				</button>
				<Route path="/home/use_query/:id" component={Receive}></Route>
			</div>
		);
	}
}
/**
 *
 * 字符串的编解码
 * 作用：编解码的作用是：在多个平台中都能使用
 * 编码
 * escape
 * encodeURI
 * encodeURIComponent
 *
 * 解码
 * 参考文档：https://www.runoob.com/jsref/jsref-unescape.html
 * URI 统一资源识别符，电脑术语
 * unescape已从web标准删除，不要使用它
 * decodeURI
 * decodeURIComponent
 *
 *
 *
 */
