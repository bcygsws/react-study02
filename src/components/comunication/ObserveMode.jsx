/**
 *
 * 6.观察者模式实现组件通信
 *
 * @观察者模式，使用一些插件实现任何类比的通信
 * 观察者模式：也是一种软件设计模式，表示一个数据对象在需要时可以向多个对象发送数据
 * 延伸：组件也是一个对象，一个组件对象向多个组件发送数据
 *
 * 具体步骤：一般的做法是在 componentDidMount() 里订阅事件，在 componentWillUnmount() 里取消订阅，
 * 然后在接收事件时调用 setState() 方法。网上有许多库实现了观察者模式，例如 PubSubJS，EventEmitter等。
 *
 * 使用PubSubJS实现父子或兄弟组件之间的通信
 * 参考文档：https://blog.csdn.net/weixin_48850734/article/details/123365910
 *
 *
 * 消息订阅-发布机制
 * 插件：pubsub-js
 * 安装：cnpm i pubsub-js --save
 * 接收信息:this.sub=PubSub.subscribe('标识符',function(msg,data){}) 在接收的组件的componentDidMount中订阅，
 * 在componentUnmount中取消订阅--->unsubscribe(this.sub)
 * 发送消息-发布订阅：PubSub.publish('标识符',data数据)
 *
 * 组件层级关系
 * ObserveMode
 *    PubA
 * PubB  PubC
 *
 *
 */
import React from 'react';
// 引入子组件PubA
import PubA from './PubA.jsx';
import PubSub from 'pubsub-js';
export default class ObserveMode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: 'GrandFather data to PubB',
			cmsg: ''
		};
	}
	render() {
		return (
			<div>
				<h2>这是ObserveMode祖父组件</h2>
				{/* 向孙子组件PubB传递info值 */}
				<button onClick={this.handle}>向孙子组件PubB传递数据</button>
				{/* 展示孙子组件PubC传给组件组件的数据gmsg */}
				<p>{this.state.cmsg}</p>
				<PubA></PubA>
			</div>
		);
	}
	handle = () => {
		PubSub.publish('toGrandSon', this.state.info);
	};
	componentDidMount() {
		this.receMode = PubSub.subscribe('toYe', (msg, data) => {
			this.setState({
				cmsg: data
			});
		});
	}
	componentWillUnmount() {
		PubSub.unsubscribe(this.receMode);
	}
}
