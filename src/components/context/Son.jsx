import React from 'react';
import GrandSon from './GrandSon.jsx';
export default class Son extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<h3>这是儿子组件</h3>
				<GrandSon color={this.props.color}></GrandSon>
			</div>
		);
	}
}
