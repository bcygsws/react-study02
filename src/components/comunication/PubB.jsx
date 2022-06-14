/**
 *
 * PubB孙子组件
 *
 *
 */
import React from 'react';
import PubSub from 'pubsub-js';
export default class PubB extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: '今夜鄜州月',
			info: 'B to Sibling C'
		};
	}
	render() {
		return (
			<div>
				<h5>这是PubB孙子组件</h5>
				<p>{this.state.msg}</p>
				{/* PubB向兄弟组件PubC传递数据 */}
				<button onClick={this.handleSibling}>
					向兄弟组件PubC传递数据
				</button>
			</div>
		);
	}
	// 订阅模式接收祖父组件传递的数据
	componentDidMount() {
		// subscribe第二个参数是回调函数
		/**
		 * @ 回调函数的两个参数
		 * msg:是传递过程中的标识符
		 * data:才是传递的数据
		 *
		 */
		this.token = PubSub.subscribe('toGrandSon', (msg, data) => {
			this.setState({
				msg: data
			});
		});
	}
	// 向兄弟组件传递数据
	handleSibling = () => {
		PubSub.publish('toSibling', this.state.info);
	};
	// 组件卸载时，取消订阅者模式
	componentWillUnmount() {
		PubSub.unsubscribe(this.token);
	}
}
