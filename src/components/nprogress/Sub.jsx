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
			<h3>{props.name}</h3>
			<h3>{props.genre}</h3>
		</div>
	);
};

export default Sub;
