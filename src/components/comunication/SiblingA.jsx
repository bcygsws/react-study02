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
				<button onClick={this.handleA}>
					向兄弟组件SiblingB传递数据
				</button>
			</div>
		);
	}
	handleA = () => {
		// 点击按钮，向SiblingB组件传递数据
		this.props.receiveA(this.state.infoA);
	};
}
