import React from 'react';
export default class MyGrand extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
	}
	render() {
		return (
			<div>
				<h5>这是孙子组件</h5>
				{/* 观测count值的变化，在祖父组件中const {count}=connectRef.current.state中拿到 */}
				<p>count值：{this.state.count}</p>
			</div>
		);
	}
}
