/**
 *
 * 组件通信方式 2：props和ref实例
 * props 接收父组件给子组件传递的值
 * 那么，如何在父组件拿到子组件的方法和属性呢？
 * 可以使用Ref实例
 *
 * 本案例中使用ref的函数方式，拿到原生子组件对象
 * <MyChild ref={ele=>this.myRef=ele}></MyChild>
 * this.myRef就是子组件的实例
 *
 *
 */
import React from 'react';
// 子组件MyChild
class MyChild extends React.Component {
	render() {
		return (
			<div>
				<h3>这是子组件</h3>
			</div>
		);
	}
	myFun = () => {
		return '同心以离居，忧伤以终老';
	};
}

export default class PropsAndRef extends React.Component {
	constructor(props) {
		// 继承自React.Component，需要调用一下super
		super(props);
		this.state = {
			info: '马上相逢无纸笔'
		};
	}
	render() {
		return (
			<div>
				<MyChild ref={(ele) => (this.myRef = ele)}></MyChild>
				<p>{this.state.info}</p>
				{/* 更改info值前后 */}
				<button onClick={this.handle}>点击按钮，更改info值</button>
			</div>
		);
	}
	handle = () => {
		// 在父组件汇总调用了子组件的myFun方法
		const x = this.myRef.myFun();
		this.setState({
			info: x
		});
	};
}
