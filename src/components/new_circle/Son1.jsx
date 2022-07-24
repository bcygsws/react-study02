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
	 * 参考文档：https://blog.csdn.net/weixin_43905830/article/details/108760828
	 * 
	 * 这里有一个bug，因为react@16.4版本以后，setState或者forceUpdate也会走getDerivedStateFromProps。直接
	 * 从props得到state的更新值。父组件Fat传入的属性值不变；点击按钮时，即时使用了setState，color值也不会改变，
	 * 一直是父组件传入的color值
	 *
	 * bug修复
	 *
	 * 当此时再点击按钮式，state中color和preColor属性值相等，不返回新的state状态
	 * 此时，点击按钮，state状态时，返回null,即不更新状态；setState后就可以更新页面了
	 * 
	 * a.在state中定义了另一个preColor，可以保证首次渲染时，传入的props.color=state.preColor
	 * b.之后，点击按钮时，setState时，react16.4以后，还要走getDerivedStateFromProps；此时，因为选择分支走return null;
	 * 不更新state状态。此时，setState可以更新页面了
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
