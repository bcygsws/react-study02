import React, { Component } from 'react';
// 路由需要的组件react-router-dom
import { Link, Route } from 'react-router-dom';
import RefHome from './RefHome.jsx';
import RefHome1 from './RefHome1.jsx';
import RefHome2 from './RefHome2.jsx';
import MyFat from './MyFat.jsx';
// 导入模块化样式
/**
 *
 * 三种方式
 * 记忆方式：
 * Content子组件中都是ref
 * 1.ref={ref}
 * 2.<Content forwardedRef={connectRef}/> 在父组件中定义forwardRef ref={props.forwardedRef}
 * 3.ref={props.forRef}
 *
 */
import RefStyles from '../../css/useRef.less';
export default class UseRef extends Component {
	render() {
		return (
			<div className={RefStyles.container}>
				<h3>组件演示forwardRef使用以及高阶组件</h3>
				{/* 演示forwardRef的用法的组件RefHome */}
				<Link to="/home/useRef/forward_ref">
					演示forwardRef，React@16.3版本推出的高阶组件
				</Link>
				<Link to="/home/useRef/forward_ref1">
					演示forwardRef，React@16.3版本推出的函数组件-自定义高阶组件HOC
				</Link>
				<Link to="/home/useRef/forward_ref2">
					演示forwardRef，React@16.3版本推出的函数组件-借用withRouter高阶组件和forwardRef
				</Link>
				<Link to="/home/useRef/change_class_grandson">
					演示forwardRef，React@16.3版本推出的函数组件-使用forwardRef更改孙子组件中的count值
				</Link>
				<Route
					path="/home/useRef/forward_ref"
					component={RefHome}
				></Route>
				<Route
					path="/home/useRef/forward_ref1"
					component={RefHome1}
				></Route>
				<Route
					path="/home/useRef/forward_ref2"
					component={RefHome2}
				></Route>
				<Route
					path="/home/useRef/change_class_grandson"
					component={MyFat}
				></Route>
			</div>
		);
	}
}
