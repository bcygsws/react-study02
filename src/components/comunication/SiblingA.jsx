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
			infoA: '这是SiblingA子组件的数据'
		};
	}
	render() {
		return (
			<div>
				<h3>这是SiblingA子组件</h3>
				<p>{this.state.infoA}</p>
				<input type="text" name="" id="txt" onChange={this.handleInput}/>
				<button onClick={this.handleA}>
					向兄弟组件SiblingB传递数据
				</button>
			</div>
		);
	}
	// 处理文本框的输入
	handleInput=()=>{

	}
	handleA = () => {
		// 点击按钮，向SiblingB组件传递数据
		this.props.receiveA(this.state.infoA);
	};
}
