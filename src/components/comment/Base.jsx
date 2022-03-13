import React from 'react';
function Base(props) {
	return (
		<div>
			<p>
				评论人：<span>{props.user}</span>
			</p>
			<p>
				评论内容：<span>{props.content}</span>
			</p>
		</div>
	);
}
export default Base;
