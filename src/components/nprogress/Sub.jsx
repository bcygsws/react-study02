/**
 *
 * @ 渲染的每一部电影的信息展示组件
 *
 *
 */
import React from 'react';

const Sub = (props) => {
	return (
		<div>
			<h3 style={{ color: '#22ee44' }}>{props.name}</h3>
			<h4>{props.genre}</h4>
			<hr />
		</div>
	);
};

export default Sub;
