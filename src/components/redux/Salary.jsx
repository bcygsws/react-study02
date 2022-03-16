/**
 *
 * @ 小明将自己工资涨扣情况共享给Count和Person
 */
import React, { Component } from 'react';
// 导入react-redux
import { connect } from 'react-redux';
// 导入money_action.js文件
import { addMoney, removeMoney } from './money_action.js';
class Salary extends Component {
	myRef = React.createRef();
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h1>我是Salary组件</h1>
				<p>当前工资为：{this.props.money}</p>
				{/* 选择扣除的金额，100的整数 */}
				<select ref={this.myRef}>
					<option value="100">100</option>
					<option value="200">200</option>
					<option value="300">300</option>
				</select>
				<button onClick={this.incMoney}>涨工资</button>
				<button onClick={this.decMoney}>扣工资</button>
				<hr />
			</div>
		);
	}
	incMoney = () => {
		const { value } = this.myRef.current;
		this.props.incMoney(value * 1);
	};
	decMoney = () => {
		const { value } = this.myRef.current;
		this.props.decMoney(value * 1);
	};
}
export default connect(
	(state) => ({
		person: state.person,
		count: state.count,
		money: state.money
	}),
	{
		incMoney: addMoney,
		decMoney: removeMoney
	}
)(Salary);
