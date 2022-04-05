// 子组件的创建依赖react
import React from 'react';
function DivCom(props) {
	// g.通过属性传递过来的数据都是只读的，不能够修改
	// 例如：在函数组件中props.name="李红"，这是错误的，函数组件内部接收的属性props只读，不能重新赋值
	return (
		<div>
			这是一个div
			<p className="sty">雨打梨花深闭门，孤负青春，虚负青春。</p>
			<label htmlFor="ab12">这是label标签</label>
			{
				// 这是注释的中正确写法
			}
			{/* 这是注释，这种写法只占了一行，推荐这种方式 */}
			{/* 和vue中双花括号渲染很不一样，使用单引号，渲染变量值 */}
			<p>
				{props.name}---{props.age}
			</p>
		</div>
	);
}
export default DivCom;
