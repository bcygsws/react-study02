/**
 *
 * @ 单独的组件演示React生命周期钩子钩子 componentWillReceiveProps
 * 
 *
 * 父组件注入的属性发生改变时，子组件中最早在componentWillReceiveProps的唯一参数nextProps可以拿到最新的props值
 * 而对于this.props,只能在componentDidUpdated(){
 * 			console.log(this.props);// 只能在更新渲染完成的钩子中才能获得this.props是最新值，前面的所有钩子中拿到的this.props的旧值
 * };
 *
 *
 *
 */
import React from 'react';
export default class Parent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pmsg: '这是父组件传递的值'
		};
	}
	render() {
		return (
			<div>
				<h2>该组件单独演示生命周期钩子componentWillReceiveProps</h2>
				{/* 点击按钮，修改state中的值，观察子组件Son中的componentWillReceiveProps钩子的变化 */}
				<input
					type="button"
					value="父组件修改state中pmsg值"
					onClick={this.handle}
				/>
				{/* 向子组件传递一个属性值pmsg */}
				<Son pmsg={this.state.pmsg}></Son>
			</div>
		);
	}
	handle = () => {
		this.setState({
			pmsg: '娃哈哈'
		});
	};
}
class Son extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>这是子组件Son</h3>
				<p>{this.props.pmsg}</p>
			</div>
		);
	}
	// 这个钩子只有一个参数nextProps
	UNSAFE_componentWillReceiveProps(nextProps) {
		//
		console.log(this.props); // pmsg: '这是父组件传递的值'}
		console.log(this.props.pmsg);
		// 单独演示该钩子的执行
		console.log(nextProps); // {pmsg: '娃哈哈'}
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log(this.props); // {pmsg: '这是父组件传递的值'}
		console.log(this.props.pmsg);
		console.log(nextProps); // {pmsg: '娃哈哈'}
		console.log(nextState); // null
		return true;
	}
	componentWillUpdate(nextProps, nextState) {
		console.log(this.props); // {pmsg: '这是父组件传递的值'}
		console.log(this.props.pmsg);
		console.log(nextProps); // {pmsg: '娃哈哈'}
		console.log(nextState); // null
	}
	componentDidUpdate(prevProps, prevState) {
		console.log(this.props); // {pmsg: '娃哈哈'}
		console.log(this.props.pmsg);
		console.log(prevProps); // {pmsg: '这是父组件传递的值'}
		console.log(prevState); // null
	}
}
/**
 *
 * @
 * 1.当子组件第一次被渲染时，componentWillReceiveProps不会被触发
 * 2.当父组件传递的属性值，变化时，componentWillReceiveProps会被触发，该钩子只有一个参数。表示属性变化后的对象
 * this.props中获取的还是旧值pmsg: '这是父组件传递的值'}
 * 但该钩子自带的参数nextProps，打印的是变化后的属性对象{pmsg: '娃哈哈'}
 * 3.在子组件Son中 完成更新的生命周期钩子componentDidUpdate阶段，在这个钩子函数中打印this.props才能拿到的是this.props更新
 * 后的值
 *
 *
 */
