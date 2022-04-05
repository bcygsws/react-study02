import React, { forwardRef } from 'react';
// 第一种写法：为需要增强的组件传两个参数，props和ref，但是props属性没有使用，第二和第三种写法，只传递一个参数props，不用使用ref
const Content = (props, ref) => {
	/* 把在父组件中绑定的ref={connectRef}传递给{ref} */
	return (
		<div>
			<input type="password" name="pwd" id="pwd" ref={ref} />
		</div>
	);
};
// 实现了在父组件中把ref绑定到子元素中的某个元素，forwardRef(cb)相对于接收了一个回调函数
export default forwardRef(Content);
