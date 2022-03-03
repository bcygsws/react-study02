// 循环项，渲染的组件
import React from 'react';
function SubList(props) {
	return (
		<div>
			<div>评论人：{props.user}</div>
			<div>评论内容：{props.content}</div>
		</div>
	);
}
export default SubList;
