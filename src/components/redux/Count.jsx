import React from 'react';
import { connect } from 'react-redux';
import {
	incrementAction,
	decrementAction,
	incrementActionAsync
} from './count_action.js';

//UI组件
class Count extends React.Component {
	increment = () => {
		const { value } = this.selectNumber;
		// 注意：派送actions，只需传入数据参数即可；至于type类型，在actions里面按需添加；这个type类型，只有reducer纯函数需要它，view视图
		// 中不需要明确它
		this.props.increment(value * 1);
	};
	decrement = () => {
		const { value } = this.selectNumber;
		this.props.decrement(value * 1);
	};
	incrementIfOdd = () => {
		const { value } = this.selectNumber;
		const { count } = this.props;
		if (count % 2 !== 0) {
			this.props.increment(value * 1);
		}
	};
	incrementAsync = () => {
		const { value } = this.selectNumber;
		this.props.incrementAsync(value * 1, 500);
	};
	render() {
		console.log(this);
		return (
			<div>
				<h1>
					我是Count组件，下方组件总人数为：{this.props.person.length}
				</h1>
				<h2>当前求和：{this.props.count}</h2>
				<select ref={(c) => (this.selectNumber = c)}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
				&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前总数为奇数+</button>
				&nbsp;
				<button onClick={this.incrementAsync}>异步+</button>&nbsp;
				<p>Salary当前工资为：{this.props.money}</p>
				<hr />
			</div>
		);
	}
}

//容器组件
// UI组件负责渲染组件，connect()将UI组件和容器组件联系起来；可以这样认为容器组件中UI组件负责渲染界面，而容器组件本身负责业务逻辑
/**
 *
 * @ 参数(mapStateToProps,mapDispatchToProps,mergeProps,option)
 * 仅关注前两个参数，后面的参数可选，让其使用默认值
 * mapStateToProps
 * 1.负责输入逻辑，将state数据映射成UI组件的输入参数
 *
 * 2.mapStateToProps会订阅store,每当state数据变化，mapStateToProps就重新计算UI组件的参数，然后重新更新页面
 * mapDispatchToProps负责输出逻辑(dispatch迪斯八奇)，将View视图上的动作映射成Action,然后由UI组件派送出去
 *
 * 3.注意：在view视图中，不需要明确action中的type,只需要为actions函数中传送data参数即可；至于type，纯函数中需要根据type类型
 * 确定是哪种action，view视图中不需要关注它
 *
 */
function mapStateToProps(state) {
	return { count: state.count, person: state.person, money: state.money };
}
export default connect(
	// (state) => ({
	// 	count: state.count,
	// 	person: state.person,
	// 	money: state.money
	// }),
	mapStateToProps,
	{
		increment: incrementAction,
		decrement: decrementAction,
		incrementAsync: incrementActionAsync
	}
)(Count);
