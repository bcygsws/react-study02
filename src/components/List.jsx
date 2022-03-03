/* 用上面的数据，并使用for循环生成多个组件 */
// CommentList = [
//   { user: '张三', content: '哈哈，沙发' },
//   { user: '张三2', content: '哈哈，板凳' },
//   { user: '张三3', content: '哈哈，凉席' },
//   { user: '张三4', content: '哈哈，砖头' },
//   { user: '张三5', content: '哈哈，楼下山炮' }
// ]
/**
react中写样式
对象和模块
一、对象这个文件，导入时，放在文件的顶端
style={{margin:center}}
或者let obj={margin:center}style={obj}

二、模块导入法
a.模块导入import 'path路径'; 全局样式
b.import Obj from 'path路径'; 需要在css-loader中开启模块化
这种方式导入后，类名会生成了一系列字符串
这种方式和:global(.title){

}违背。
总结：如果保留原类名(className="title")，就会使用../css/subTitle.css中的样式
:global(.title){

}
如果使用一个导入对象的模块，import Title from '../../css/subTitle.css';
className={Title.title}，则调用
.title{}



 */

import React from 'react';
import SubList from './subcomponents/SubList.jsx';
import ListStyle from '../css/list.scss';

/**
 *
 * @ 1.使用之前需要在配置文件中为所有配置的css-loader开启模块化
 * 否则将出现警告："export 'default' (imported as 'MyList') was not found in '../css/list.scss'
 * @ 2.这个对象依赖路径，导入相同的路径，不论命名的对象名称是否相同？都将将类名命名成相同的字符串
 * @ 3.使用时，为需要单独处理样式的jsx文件，建立一个单独的样式文件，通过这种方式引入，然后不同样式中即时有相同的类名，也不会相互
 * 影响
 *
 *
 */
// 导入List的子组件SubList
// 导入title类样式需要的文件
import ListTitle from '../css/listTitle.css';
console.log(ListTitle);
export default class List extends React.Component {
	constructor(props) {
		super();
		this.state = {
			CommentList: [
				{ user: '张三', content: '哈哈，沙发' },
				{ user: '张三2', content: '哈哈，板凳' },
				{ user: '张三3', content: '哈哈，凉席' },
				{ user: '张三4', content: '哈哈，砖头' },
				{ user: '张三5', content: '哈哈，楼下山炮' }
			]
		};
	}
	render() {
		// 写法1：在return 代码片段外面实现遍历，然后把一个变量arr放进去   比较low
		// 定义一个空数组，存储对象
		// let arr = [];
		// // 拿到main.js传递过来的数组CommentList
		// let rec = this.state.CommentList;
		// console.log(rec);
		// // item用于传递属性，index当作key值
		// rec.forEach((item, index) => {
		// 	let son = <SubList {...item} key={index}></SubList>;
		// 	arr.push(son);
		// });
		// return <div>{arr}</div>;

		// 写法2：直接在return语句中使用Array的map方法进行遍历，map意思是进行某个操作，然后返回一个数组，或者一个空数组。重要：
		// 这并不违反【再见括号内只能使用表达式，其含义可以延展为本身是表达式，或者js代码返回值是表达式】
		// 拿到main.js传递过来的数组CommentList
		// item用于传递属性，index当作key值

		return (
			<div className={ListStyle.list_container}>
				{/* <h3 className="title">评论列表案例</h3> */}
				<h3 className={ListTitle.title}>评论列表案例</h3>
				{/* 推荐这种方式，这也是Array的map方法的优点之一，map方法返回值是数组，数组仍然可以继续进行操作，因此map也支持连写 */}
				{this.state.CommentList.map((item, index) => {
					return <SubList {...item} key={index}></SubList>;
				})}
			</div>
		);
	}
}
