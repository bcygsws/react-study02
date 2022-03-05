/**
 *
 * @ 关于this绑定
 *
 *
 */
import React from 'react';
export default class BindThis extends React.Component {
	constructor(props) {
		super(props);
		// this指向实例
		this.state = { msg: '' };
		// a.第二种绑定方式：在构造函数中绑定
		// b.bind绑定 后的返回值是原函数的一个拷贝，并包括改造后的this指向和参数
		// 必须重新赋值，否则仅仅this.secondHandle.bind(this, '〽️', '⬅️');事件处理函数中的this还是指向undefined
		this.secondHandle = this.secondHandle.bind(this, '〽️', '⬅️');
	}
	render() {
		// console.log(this);// 渲染函数render中的this是当前组件的实例
		return (
			<div>
				<h3>绑定this并传参的几种方式</h3>
				{/* 注意区分：bind 以及apply/call都可以改变this指向。不同之处在于bind改变this指向不是立即执行。而后者，call/applay改变
      this指向后，立即执行 */}
				{/* 插件Emoji Code的使用：键入ji根据提示选择需要的表情符号 */}
				{/* 插件 Emoji插件，ctrl+shift+p 选择insert emoji ,进入选择emoji框，然后直接enter */}
				{/* git Emoji commit中文版，点击源代码管理器中笑脸图标，会弹出选择emoji的下拉菜单供选择，即可切换 */}
				<p>{this.state.msg}</p>
				<input
					type="button"
					value="this的第一种传递参数的方式"
					onClick={this.firstHandle.bind(this, '⭐', '⭕')}
				/>
				<hr />
				{/* 在构造函数中为事件处理bind绑定this */}
				<input
					type="button"
					value="第二种传参方式"
					onClick={this.secondHandle}
				/>
				{/* 第三种传参的方式onClick中也要写给箭头函数，避免箭头函数书写的事件处理函数，在按钮没点击的情况下触发 */}
				<hr />
				<input
					type="button"
					value="this的第三种传参方式"
					onClick={() => {
						this.thirdHandle('💇', '🙂');
					}}
				/>
				{/* 这种箭头函数直接传递参数的方式有个bug,系统在解析代码到当前位置时，看到thirdHandle是一个箭头函数，就会直接调用：
			报一个错误：ncaught Error: Maximum update depth exceeded. This can happen when a component repeatedly calls 
		setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent
	 infinite loops. */}
				{/* 解决办法：在onClick中也也一个箭头函数，返回的是函数代码，不是函数的调用，就不会出现没有点击按钮函数自己执行的问题了 */}
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
		this.setState({
			msg: 'bind的第一种绑定和传参方式：' + arg1 + arg2
		});
	}
	secondHandle(arg1, arg2) {
		console.log(this); // undefined  在构造函数重赋值以后，this就正常了，打印结果是当前组件的实例
		/**
		 *
		 * 在构造函数中bind了指向组件实例的this,然而此处仍然打印undefined
		 * 解决方案：
		 * 要接收以下绑定后的返回值
		 * bind绑定是有返回值的，其返回值是：返回一个原函数的拷贝，并拥有指定的 this 指向和初始参数
		 * 【区别】bind apply/call 都可以修改this的执行，不同之处在于this修改执行后不是立即执行的。
		 * 备注：call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。
		 * 记忆联想：apply---参数列表时数组Array
		 * 见MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
		 * 【理解Array.prototype.slice.call(arguments)】
		 * https://www.cnblogs.com/papi/p/9234964.html
		 *
		 * bind的三大作用
		 * 1.绑定函数，修改this指向
		 * 2.偏函数，实质是给函数添加一个预设值
		 * function list(arguments){
		 * 		return Array.prototype.slice.call(arguments);
		 * }
		 * var list1=list(123); // [1,2,3]
		 *
		 * var list2=list(null,39); // 其含义是给list设置第一个预设参数39
		 * list2(1,2)  // (39,1,2)
		 *
		 *
		 * 3.setTimeout(function(){}.bind(this),1000)  实质也是改变this的指向
		 *
		 */
		this.setState({
			msg: '第二种传参方式：' + arg1 + arg2
		});
	}
	thirdHandle = (arg1, arg2) => {
		this.setState({
			msg: '这是第三种绑定并传参方式:' + arg1 + arg2
		});
	};
}

/**
 *
 * @ gitmoji-cli的使用
 *
 * $ gitmoji -c
 * 然后，选择一种emoji,提示输入提交标题和提交的message信息
 * 接着，git push origin即可
 *
 * :memo: bind提交
 *  bind绑定this并提交参数的三种方式
 *
 *
 */
