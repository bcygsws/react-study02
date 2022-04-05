/**
 *
 * @ 演示：子组件给父组件传值的两种方式
 * 第一种方式：父组件中定义个回调函数，接收子组件的传值
 *
 */
import React from 'react';
export default class Fat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pmsg: ''
		};
	}
	render() {
		return (
			<div>
				<h2>这是父组件Fat</h2>
				<p>{this.state.pmsg}</p>
				<Son getMsg={this.ReceiveData}></Son>
			</div>
		);
	}
	// 父组件中定义函数，接收子组件传递过来的数据，setState更新页面
	ReceiveData = (data) => {
		console.log(data);
		// 触发页面的更新
		this.setState({
			pmsg: data
		});
	};
}
class Son extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			smsg: '子组件数据123哈哈哈'
		};
	}
	render() {
		return (
			<div>
				<h3>这是子组件</h3>
				<p>{this.state.smsg}</p>
				<button onClick={this.sendFat}>子组件给父组件传值</button>
			</div>
		);
	}
	sendFat = () => {
		this.props.getMsg(this.state.smsg);
	};
}
