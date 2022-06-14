/**
 *
 * @ 子组件SiblingB
 *
 */
import React from 'react';
export default class SiblingB extends React.PureComponent {
	render() {
		return (
			<div
				style={{
					width: 200,
					height: 200,
					backgroundColor: 'greenyellow'
				}}
			>
				<h3>这是SiblingB子组件</h3>
				<p>{this.props.fat}</p>
			</div>
		);
	}
}
