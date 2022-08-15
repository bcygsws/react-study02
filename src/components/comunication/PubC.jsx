/**
 *
 * PubC孙子组件
 *
 *
 */
import React from 'react';
import PubSub from 'pubsub-js';
export default class PubC extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cmsg: '中原北望气如山'
		};
	}
	render() {
		return (
			<div>
				<h5>这是PubC孙子组件</h5>
				<p>{this.state.cmsg}</p>
				<button onClick={this.handleTo}>
					子组件PubC向父组件PubA和祖父ObserveMode组件传递数据
				</button>
			</div>
		);
	}
	// 孙子组件PubC向父组件PubA和祖父组件ObserveMode传递数据
	handleTo = () => {
		PubSub.publish('toYe', this.state.cmsg);
	};
	componentDidMount() {
		this.receSib = PubSub.subscribe('toSibling', (msg, data) => {
			this.setState({
				cmsg: data
			});
		});
	}
	componentWillUnmount() {
		PubSub.unsubscribe(this.receSib);
	}
}
