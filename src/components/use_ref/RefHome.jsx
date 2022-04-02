/**
 *
 * 两个问题
 * 参考文档：https://blog.csdn.net/weixin_44240581/article/details/117755748
 * 1.使用ref获取原生对象的三种方式
 * a.ref string的方式，类比vue,只是在引用时不需要$符号
 * ref="myRef"   引用：this.refs.myRef
 *
 * b.推荐的方式，使用函数
 * <span ref={(ele)=>{this.myRef=ref;}}></span>
 *
 * c.React@16.3之后推出的createRef和forwardRef、useRef
 *
 * 体会forwardRef的好处
 *
 * Refs 使用场景
 * 处理焦点、文本选择或者媒体的控制
 * 触发必要的动画
 * 集成第三方 DOM 库
 *
 * 案例：Home的子组件为Content，在Home父组件中点击按钮，让子组件中的输入文本框获取焦点
 *
 *
 */
import React, { useRef } from 'react';
// 导入子组件Content
import Content from './Content.jsx';

// const RefHome = () => {
// 	// 1.创建一个ref对象
// 	const connectRef = useRef(null);
// 	const handle = () => {
// 		const _ref = connectRef.current;
// 		_ref.focus();
// 	};
// 	return (
// 		<div>
// 			<h3>这是forwardRef使用演示的父组件</h3>
// 			<button onClick={handle}>
// 				点击按钮，让子组件Content的密码框获得焦点
// 			</button>
// 			<Content ref={connectRef}></Content>
// 		</div>
// 	);
// };
// export default RefHome;
// 第二种方式：Content中定义高阶组件HOC
const RefHome = (props) => {
	// 1.创建一个ref对象
	const connectRef = useRef(null);
	const handle = () => {
		const _ref = connectRef.current;
		_ref.focus();
	};
	return (
		<div>
			<h3>这是forwardRef使用演示的父组件</h3>
			<button onClick={handle}>
				点击按钮，让子组件Content的密码框获得焦点
			</button>
			<Content ref={connectRef} />
		</div>
	);
};
export default RefHome;
