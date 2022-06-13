/**
 *
 * @React组件通信
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
				<Switch>
					<Route
						path="/home/com/son_to_fat"
						component={SonToFat}
					></Route>
					<Route
						path="/home/com/props_ref"
						component={PropsAndRef}
					></Route>
				</Switch>
			</div>
		);
	}
}
