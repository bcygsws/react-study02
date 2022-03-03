// 循环项，渲染的组件
import React from 'react';
function SubList(props) {
	// import导入到main.js文件中是全局样式；对于单个组件推荐这种对象写样式的方式
	let obj = { textDecoration: 'underline', color: 'blue' };
	return (
		<div className="sub_container">
			<div className="user">
				评论人：
				{/* 注意：写style样式是两层括号，外层表示写js代码，内层花括号是样式对象 */}
				<span style={{ textDecoration: 'underline', color: 'red' }}>
					{props.user}
				</span>
			</div>
			<div className="content">
				评论内容：<span style={obj}>{props.content}</span>
			</div>
		</div>
	);
}
export default SubList;
