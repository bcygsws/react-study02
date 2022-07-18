/**
 *
 * @ ref和key是不可以传递的，引入forwardRef来解决这个问题
 * 参考文档：
 * 解决上述问题；
 * 1.forwardRef  Content.jsx
 * 2.定义高阶组件  Content1.jsx
 * 3.forwardRef配合withRouter  Content2.jsx
 *
 * 本案例演示：使用forward实现祖父组件，更改孙子组件中的数据
 *
 *
 *
 */
import React, { useRef } from 'react';
import MySon from './MySon.jsx';

const MyFat = () => {
	const connectRef = useRef(null);
	// 获取孙子组件，是个类组件中state的count值
	const handleRef = () => {
		// 原生对象ref实例.current,传递的直接是connectRef实例本身
		const _ref = connectRef.current;
		const { count } = _ref.state;
		_ref.setState({
			count: count + 1
		});
	};
	return (
		<div>
			<h3>这是祖父组件</h3>
			<button onClick={handleRef}>更改count值</button>
			<MySon ref={connectRef}></MySon>
		</div>
	);
};
export default MyFat;
