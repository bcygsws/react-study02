/**
 *
 * 接收查询参数
 *
 *
 */
import React, { Component } from 'react';
export default class Receive extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.match.params.id
		};
	}
	render() {
		console.log(this);
		return (
			<div>
				<h3>显示params参数id值：</h3>
				<p>{this.state.id}</p>
			</div>
		);
	}
}
