/**
 *
 * PubA子组件
 *
 *
 */
import React from 'react';
//  导入子组件PubB和PubC
import PubB from './PubB.jsx';
import PubC from './PubC.jsx';
export default class PubA extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cmsg: ''
		};
	}
	render() {
		return (
			<div>
				<h3>这是PubA子组件</h3>
				{/* 子组件PubC传递过来的数据 */}
				<p>{this.state.cmsg}</p>
				<PubB></PubB>
				<PubC></PubC>
			</div>
		);
	}
	// 接收孙子组件PubC传递的数据
	componentDidMount() {
		this.rece = PubSub.subscribe('toYe', (msg, data) => {
			this.setState({
				cmsg: data
			});
		});
	}
	// 组件将要卸载时取消订阅
	componentWillUnmount() {
		PubSub.unsubscribe(this.race);
	}
}
