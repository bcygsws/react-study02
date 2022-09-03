/**
 *
 * @ 子组件SiblingA
 *
 */
import React from 'react';
export default class SiblingA extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			// 文本框的值
			msg: ''
		};
	}
	render() {
		return (
			<div>
				<h3>这是SiblingA子组件</h3>
				<p>{this.state.infoA}</p>
				<input
					type="text"
					name=""
					id="txt"
					onChange={this.handleInput}
					value={this.state.msg}
				/>
				<button onClick={this.handleA}>
					向兄弟组件SiblingB传递数据
				</button>
			</div>
		);
	}
	// 处理文本框的输入
	handleInput = (e) => {
		// 为了拿到e.target数据，调用一下persist()方法；原因是：React 16中会将e.target数据对象重置，从而无法拿到e.target对象
		e.persist();
		// 测试
		// console.log(e.target);
		this.setState({
			msg: e.target.value
		});
	};
	handleA = () => {
		// 点击按钮，向SiblingB组件传递数据
		this.props.receiveA(this.state.msg);
	};
}
