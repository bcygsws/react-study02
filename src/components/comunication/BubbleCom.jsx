/**
 *
 * 组件通信方式四；dom事件机制实现通信
 * @dom事件机制实现通信
 * 要区分：e.target和ref对象
 * e.target 拿到的是引起冒泡的事件源对象，但是它并不是子组件实例
 * 而ref才是子组件实例
 *
 *
 */
import React from 'react';
export default class BubbleCom extends React.Component {
	constructor(props) {
		super(props);
		// 父组件私有数据
		this.state = {
			msg: '我是父组件原来的数据'
		};
	}
	render() {
		return (
			<div>
				<h3>这是dom事件机制通信父组件</h3>
				<div onClick={this.handleClick}>
					<MyChild></MyChild>
				</div>
				<p>{this.state.msg}</p>
			</div>
		);
	}
	handleClick = (e) => {
		// 拿到引起冒泡的事件源对象（div），但是它不是像ref那样拿到的子组件实例
		// 因此，e.target中没有mySon()这个方法
		console.log(e.target);
	};
}
class MyChild extends React.Component {
	constructor(props) {
		super(props);
		// 子组件私有数据
		this.state = {
			info: '子组件私有数据-江山故宅空文藻'
		};
	}
	render() {
		return (
			<div
				style={{ width: 300, height: 300, backgroundColor: 'hotpink' }}
			>
				<h4>这是dom事件机制通信子组件</h4>
			</div>
		);
	}
	mySon = () => {
		return this.state.info;
	};
}
