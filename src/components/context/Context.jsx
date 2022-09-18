/**
 *
 * @ Context特性-这是使用Context的传统方式
 * getChildContextTypes
 * 记忆：前三个、后三个、后两个
 * 两个静态属性，1个方法
 *
 * 使用步骤
 * 1.在父组件中定义一个函数function,这个function有固定的名字，叫做getChildContext,这个函数必须返回一个对象
 * 2.属性校验，规定父组件向子组件传递数据的类型
 * 3.在孙子组件中，属性校验，验证接收到祖父组件传递的数据。Context特性可以绕过儿子组件了
 *
 *
 */
import React from 'react';
import Son from './Son.jsx';
// Context特性用到属性校验包，要导入
import ReactTypes from 'prop-types';
export default class MyContext extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: 'red',
			fontSize: 32
		};
	}
	render() {
		return (
			<div>
				<h1>这是Context特性演示组价</h1>
				{/* 点击按钮，fontSize+1,这种特性是可以响应的，在页面上，观察到，祖父级组件改变fontSize,孙子组件的字体也随着增加 */}
				<button onClick={this.changeFont.bind(this)}>
					每次将Son的字体大小+1
				</button>
				<Son color={this.state.color}></Son>
			</div>
		);
	}
	changeFont() {
		this.setState({
			fontSize: this.state.fontSize + 1
		});
	}

	getChildContext() {
		return {
			fontSize: this.state.fontSize
		};
	}
	// 2.父组件传递给子组件的数据，数据类型的校验
	static childContextTypes = {
		fontSize: ReactTypes.number
	};
}
