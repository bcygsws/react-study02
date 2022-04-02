// import React, { forwardRef } from 'react';
import React from 'react';
import { withRouter } from 'react-router-dom';
// 导入定义的高阶组件HOC
// import Hoc1 from './HOC1.jsx';

// 第一种写法：为需要增强的组件传两个参数，props和ref，但是props属性没有使用，第二和第三种写法，只传递一个参数props，不用使用ref
// const Content = (props, ref) => {
// 	/* 把在父组件中绑定的ref={connectRef}传递给{ref} */
// 	return (
// 		<div>
// 			<input type="password" name="pwd" id="pwd" ref={ref} />
// 		</div>
// 	);
// };
// // 实现了在父组件中把ref绑定到子元素中的某个元素，forwardRef(cb)相对于接收了一个回调函数
// export default forwardRef(Content);

// 第二种写法：定义一个高阶组件HOC
// 被包装的组件
export default React.forwardRef((props, ref) => {
	const Wrapper = withRouter(Content2);
	return <Wrapper {...props} forwardedRef={ref} />;
});
const Content2 = (props) => {
	return (
		<div>
			<input type="password" ref={props.forwardedRef} />
		</div>
	);
};
// 高阶组件的本质是函数：输入一个组件，得到一个新组件（增强过的组件）
// 高阶组件会把所有接收到的props透传，传递给被包裹的组件
