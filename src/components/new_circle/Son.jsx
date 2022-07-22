import React from 'react';
export default class Son extends React.Component {
	state = {
		color: '#000000'
	};
	render() {
		return (
			<div>
				<h5>子组件</h5>
				<p style={{ color: this.state.color }}>{this.state.color}</p>
				<button onClick={this.handle}>
					更新state中的color值，观察渲染文本的颜色
				</button>
			</div>
		);
	}
	handle = () => {
		this.setState({
			color: '#fff666'
		});
	};
	// 生命周期钩子getDerivedStateFromProps
	// 场景一、无条件从props更新state
	static getDerivedStateFromProps(props, state) {
		if (props.color !== state.color) {
			// 无条件从props更新state
			return {
				color: props.color
			};
		}
		return null;
	}
}
