import React from 'react';
import ReactTypes from 'prop-types';
export default class ContextE extends React.Component {
	// 孙子组件校验
	static contextTypes = {
		info: ReactTypes.string
	};
	render() {
		return (
			<div style={{width:400,height:400,backgroundColor:'hotpink'}}>
				<h5>这是ContextE子组件</h5>
				{/* 拿到祖父组件传递的info，并渲染到页面 */}
				<p>{this.context.info}</p>
			</div>
		);
	}
}
