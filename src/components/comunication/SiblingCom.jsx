/**
 *
 * 五、借助父组件实现两个兄弟组件之间的通信
 * 
 * 1.子组件调用父组件传递的回调，receiveA实现，子组件向父组件传值
 * 2.父组件注入给另一个子组件的props变化，引起另一个子组件的更新渲染
 * 
 *
 *
 */
import React from 'react';
import SiblingA from './SiblingA.jsx';
import SiblingB from './SiblingB.jsx';
export default class SiblingCom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fat: ''
		};
	}
	render() {
		return (
			<div>
				<h3>这是兄弟组件共有的父组件</h3>
				<p>{this.state.fat}</p>
				<SiblingA receiveA={this.receiveA}></SiblingA>
				{/* 向siblingB组件中传递的属性变化，引起子组件的dom更新(父组件注入的props变化，引起子组件的更新渲染) */}
				<SiblingB fat={this.state.fat}></SiblingB>
			</div>
		);
	}
	// 接收子组件SiblingA的数据
	receiveA = (data) => {
		console.log(data);
		this.setState({
			fat: data
		});
	};
}
