/**
 *
 *
 *
 *
 */
import React from 'react';
import Counter17 from './Counter17.jsx';
export default class Fat17 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 0
		};
	}
	handle = () => {
		this.setState({
			num: this.state.num + 1
		});
	};
	render() {
		return (
			<div>
				<h4>
					这是props变化影响子组件的生命周期钩子getDerivedStateFromProps
					nextProps参数变化
				</h4>
				<button onClick={this.handle}>
					更改传给子组件Counter17的属性值initVal
				</button>
				<p>num即时值：{this.state.num}</p>
				{/* react中没有vue中的指令， */}
				<Counter17 initVal={this.state.num}></Counter17>
			</div>
		);
	}
}
