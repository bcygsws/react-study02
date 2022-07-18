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

// 第三种写法：导出一个React.forwardRef(回调函数)
// 1.先处理回调函数，为wrapper传入一个自定义属性forRef
// 2.之后在Content2中使用ref={props.forRef}调用
// 被包装的组件

export default React.forwardRef((props, ref) => {
	const Wrapper = withRouter(Content2);
	return <Wrapper {...props} forRef={ref} />;
});
const Content2 = (props) => {
	return (
		<div>
			{/* 在props上挂载一个属性，forRef */}
			<input type="password" ref={props.forRef} />
		</div>
	);
};

// 高阶组件总结
// 1.高阶组件的本质是函数：输入一个组件，得到一个新组件（增强过的组件）
// 2.高阶组件会把所有接收到的props传递给被包裹的组件（透传）
// 3.ref和key类似，不能够透传，绑定在外层高阶组件上
// 4.高阶组件可以嵌套，如：HOC1(HOC2(HOC3(Content)))
