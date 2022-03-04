/**
 *
 * @ 关于this绑定
 *
 *
 */
import React from 'react';
export default class BindThis extends React.Component {
	render() {
		// console.log(this);// 渲染函数render中的this是当前组件的实例
		return (
			<div>
				<h3>绑定this并传参的几种方式</h3>
				{/* 注意区分：bind 以及apply/call都可以改变this指向。不同之处在于bind改变this指向不是立即执行。而后者，call/applay改变
      this指向后，立即执行 */}
				{/* 插件Emoji Code的使用：键入ji根据提示选择需要的表情符号 */}
				{/* 插件 Emoji插件，ctrl+shift+p 选择insert emoji ,进入选择emoji框，然后直接enter */}
				<input
					type="button"
					value="this的第一种传递参数的方式"
					onClick={this.firstHandle.bind(this, '⭐', '⭕')}
				/>
			</div>
		);
	}
	// 事件处理函数
	// 1.1 普通函数中this的指向是undefined
	// firstHandle() {
	// 	console.log(this);
	//   // this.setState() // 不能使用了，因为setState是组件实例的方法，不是undefined的方法
	// }
	// 1.2 箭头函数的this指向当前函数所在的上下文中的this
	// this返回的是当前组件的实例，可以在事件处理函数内部使用this.setState()
	// firstHandle = () => {
	// 	console.log(this); // 返回当前组件的实例 BindThis {props: {…}, context: {…}, refs: {…}, updater: {…}, firstHandle: ƒ, …}
	// };
	// 1.3 使用bind修改this的指向,需要在调用的位置onClick={this.firstHandle.bind(this)}.render函数中的this指得就是当前组件的实例
	/**
	 * @ bind的第一个参数是更改后的this指向，第二个参数开始，才是为firstHandle.bind(this,arg1,arg2)传递的参数
	 *
	 * 接收函数中
	 * firstHandle(arg1,arg2){
	 *
	 * }
	 *
	 *
	 */
	firstHandle(arg1, arg2) {
		console.log(this); // 经过bind修改后，普通函数此处的this已经是当前组件实例了
		console.log('传入的参数是：' + arg1 + '----' + arg2);
	}
}
