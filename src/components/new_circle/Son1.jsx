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
	 * 参考文档：https://www.jianshu.com/p/26d7667f35ef
	 * 使用getDerivedStateFromProps要注意以下两点：
	 * a.要比较传入的props和之前的props值
	 * b.getDerivedStateFromProps是静态方法，同时要保持其纯函数，不产生副作用
	 * 
	 * 上述a、b情况，大多数情况都使用，但是还是有产生bug的风险
	 * 解决：
	 * 1.将组件改成完全可控组件（方法和状态值由父组件控制）
	 * 2.将组件改成完全不可控组件(也就是组件完全不接受通过getDerivedStateFromProps来更新状态)，而是把props挂载在构造函数
	 * 上，设置key来处理；因为key值变化时，组件会重新进行渲染，而不再是更新
	 * 3.保持上述组件模式，通过惟一的id来判断组件是否更新
	 * 4.第四种不使用 getDerivedStateFromProps，通过 ref 来把改变邮箱的方法暴露出去
	 * 
	 * 参考文档：https://juejin.cn/post/7087197745252941861
	 * SSR(Server-side rendering) 服务端渲染:简单来说，html是由服务端编写，
	 * 可以动态地更改页面内容，即所谓的动态页面；早期的asp jsp php这些server page就采用的SSR。
	 * 但基于React技术栈，又有些许不同，server bundle构建的 时候，要吐多少模块，是server端决定的。
	 * client bundle和之前一样，差别在于这次是hydrate，而非render。
	 * 旧生命周期的问题
	 * componentWillMount：在SSR中这个方法会被重复触发多次。同时在这个方法内绑定事件无法解绑，这会造成
	 * 内存泄露，这个方法因变得不够安全高效，而逐步被弃用
	 * componentWillReceiveProps：多次更新传入不同的props,会导致不必要的异步请求
	 * componentWillUpdate:更新前会记录DOM的一些状态，但相隔时间过长，可能会导致状态不可信
	 * 
	 * 参考文档：https://blog.csdn.net/qq_34307801/article/details/104336691
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
