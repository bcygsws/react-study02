// 循环项，渲染的组件
import React from 'react';
// 如果没有启用模块化，那么通过这种方式接收的MyList这个对象无法打印出来，并在控制台出示警告如下：
// "export 'default' (imported as 'MyList') was not found in '../css/list.scss'
// 解决：最好为配置的所有css-loader的options选项配置modules:true;开启样式的模块化
// 开启模块化后，打印的MyList为{sub_container: '_1tZdEbQJhEaqColCtn93no', user: '_3E4feninVWrWDbGgvQ8wC4', content: '_3WHA0YVT9T94S6LGWV9nZ0'}
// 注意：这个对象的键值是字符串，是为了防止类名冲突。类名MyList.sub_container=之前的sub_container,MyList.user=之前的类名
import MySub from '../../css/sub.less';
// import '../../css/subTitle.css';
import Title from '../../css/subTitle.less';
console.log(MySub);
function SubList(props) {
	// import导入到main.js文件中是全局样式；对于单个组件推荐这种对象写样式的方式
	let obj = { textDecoration: 'underline', color: 'blue' };
	return (
		<div className={MySub.sub_container}>
			<h6 className={Title.title}>这是sub的标题</h6>
			<div className={MySub.user}>
				评论人：
				{/* 注意：写style样式是两层括号，外层表示写js代码，内层花括号是样式对象 */}
				<span style={{ textDecoration: 'underline', color: 'red' }}>
					{props.user}
				</span>
			</div>
			<div className={MySub.content}>
				评论内容：<span style={obj}>{props.content}</span>
			</div>
		</div>
	);
}
export default SubList;
