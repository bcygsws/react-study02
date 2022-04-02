// import React, { forwardRef } from 'react';
import React from 'react';
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
const Hoc = (WrappedComponent) => {
	// 返回一个有状态组件-类组件是有状态的，有state
	return class extends React.Component {
		render() {
			// this.props继续传递给包装组件WrappedComponent
			return <WrappedComponent {...this.props} />;
		}
	};
};
const Content1 = (props) => {
	return (
		<div>
			<input type="password" ref={props.forwardedRef} />
		</div>
	);
};
// 包装的过程
export default Hoc(Content1);
// 高阶组件的本质是函数：输入一个组件，得到一个新组件（增强过的组件）
// 高阶组件会把所有接收到的props透传，传递给被包裹的组件

// React高阶组件的使用
// 1.高阶组件是输入一个组件，得到另外一个组件，高阶组件不是组件，它实质上是一个函数
// 2.高阶组件主要作用是代码复用
// 3.高阶组件装饰器模式在React中的应用
// 参考文档：知乎：https://zhuanlan.zhihu.com/p/61711492?utm_source=wechat_session
// 参考文档1：https://segmentfault.com/a/1190000010307650
