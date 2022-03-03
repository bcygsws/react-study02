// CommentList = [
//   { user: '张三', content: '哈哈，沙发' },
//   { user: '张三2', content: '哈哈，板凳' },
//   { user: '张三3', content: '哈哈，凉席' },
//   { user: '张三4', content: '哈哈，砖头' },
//   { user: '张三5', content: '哈哈，楼下山炮' }
// ]
/* 用上面的数据，并使用for循环生成多个组件 */
import React from 'react';
import SubList from './subcomponents/SubList.jsx';
// 导入List的子组件SubList
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
			<div>
				{/* 推荐这种方式，这也是Array的map方法的优点之一，map方法返回值是数组，数组仍然可以继续进行操作，因此map也支持连写 */}
				{this.state.CommentList.map((item, index) => {
					return <SubList {...item} key={index}></SubList>;
				})}
			</div>
		);
	}
}
