import React from 'react';
export default class Son1 extends React.Component {
	state = {
		color: '#000000',
		preColor: ''
	};
	render() {
		return (
			<div>
				<h5>子组件Son1</h5>
				<p style={{ color: this.state.color }}>
					{this.state.color}
				</p>
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
	/**
	 * @ bug:
	 * 参考文档：
	 * 
	 * 这里有一个bug，因为react@16.4版本以后，setState或者forceUpdate也会走getDerivedStateFromProps。直接
	 * 从props得到state的更新值。父组件Fat传入的属性值不变；点击按钮时，即时使用了setState，color值也不会改变，
	 * 一直是父组件传入的color值
	 *
	 * bug修复
	 *
	 *
	 *
	 */
	static getDerivedStateFromProps(props, state) {
		if (props.color !== state.preColor) {
			// 无条件从props更新state
			return {
				color: props.color,
				preColor: props.color
			};
		}
		return null;
	}
}
