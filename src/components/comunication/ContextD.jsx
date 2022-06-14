import React from 'react';
// 引入子组件ContextE
import ContextE from './ContextE.jsx';
export default class ContextD extends React.Component {
	render() {
		return (
			<div>
				<h3>这是ContextD子组件</h3>
				<ContextE></ContextE>
			</div>
		);
	}
}
