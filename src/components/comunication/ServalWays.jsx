/**
 *
 * @React组件通信
 * React组件通信的八种方式：
 * 参考文档：https://baijiahao.baidu.com/s?id=1674880045858894330&wfr=spider&for=pc
 *
 * 多种方式
 * 一.子组件向父组件传值
 *
 */
import React from 'react';
// 导入路由相关组件
import { Link, Route, Switch } from 'react-router-dom';
// 导入组件SonToFat
import SonToFat from './SonToFat.jsx';
// 导入组件PropsAndRef
import PropsAndRef from './PropsAndRef.jsx';
import BubbleCom from './BubbleCom.jsx';
import SiblingCom from './SiblingCom.jsx';
import ObserveMode from './ObserveMode.jsx';
import GlobalMode from './GlobalMode.jsx';
import ContextCom from './ContextCom.jsx';
import ContextCom1 from './ContextCom1.jsx';
import ContextCom2 from './ContextCom2.jsx';
// 导入模块化样式
import Sty from '../../css/ways.less';
export default class ServalWays extends React.Component {
	render() {
		return (
			<div>
				<Link to="/home/com/son_to_fat" className={Sty.sty}>
					一、子组件向父组件传值
				</Link>
				<Link to="/home/com/props_ref" className={Sty.sty}>
					二、props接收属性和父组件通过ref实例访问子组件
				</Link>
				<Link to="/home/com/bubble" className={Sty.sty}>
					三、利用dom事件机制-冒泡和捕获机制通信
				</Link>
				<Link to="/home/com/sibling" className={Sty.sty}>
					四、利用共同的父组件实现兄弟组件的通信
				</Link>
				<Link to="/home/com/pub_sub" className={Sty.sty}>
					六、插件pubsub-js观察者模式实现任何级别组件通信
				</Link>
				<Link to="/home/com/window" className={Sty.sty}>
					七、全局变量window实现组件通信
				</Link>
				<Link to="/home/com/context" className={Sty.sty}>
					八、context实现跨级组件的通信
				</Link>
				<Link to="/home/com/context1" className={Sty.sty}>
					八、创建context对象的方式，Consumer接收
				</Link>
				<Link to="/home/com/context2" className={Sty.sty}>
					八、创建context对象的方式，this.context接收
				</Link>
				<Switch>
					<Route
						path="/home/com/son_to_fat"
						component={SonToFat}
					></Route>
					<Route
						path="/home/com/props_ref"
						component={PropsAndRef}
					></Route>
					<Route
						path="/home/com/bubble"
						component={BubbleCom}
					></Route>
					<Route
						path="/home/com/sibling"
						component={SiblingCom}
					></Route>
					<Route
						path="/home/com/pub_sub"
						component={ObserveMode}
					></Route>
					<Route
						path="/home/com/window"
						component={GlobalMode}
					></Route>
					<Route
						path="/home/com/context"
						component={ContextCom}
					></Route>
					<Route
						path="/home/com/context1"
						component={ContextCom1}
					></Route>
					<Route
						path="/home/com/context2"
						component={ContextCom2}
					></Route>
				</Switch>
			</div>
		);
	}
}
