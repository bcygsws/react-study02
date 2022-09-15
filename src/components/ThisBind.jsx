/**
 *
 * @ 重点：this绑定的三种方式
 *
 */
// 导入样式文件
import myBind from '../css/bind.less';
import React from 'react';
export default class BindThis extends React.Component {
	myRef = React.createRef();
	constructor(props) {
		super(props);
		// this指向实例
		this.state = { msg: '这是默认的msg' };
		// a.第二种绑定方式：在构造函数之中绑定
		// b.bind绑定 后的返回值是原函数的一个拷贝，并包括改造后的this指向和参数
		// 必须重新赋值，否则仅仅this.secondHandle.bind(this, '〽️', '⬅️');事件处理函数中的this还是指向undefined
		this.secondHandle = this.secondHandle.bind(this, '〽️', '⬅️');
	}
	render() {
		// console.log(this);// 渲染函数render中的this是当前组件的实例
		return (
			<div className={myBind.b_container}>
				<h3>绑定this并传参的几种方式</h3>
				{/* 注意区分：bind 以及apply/call都可以改变this指向。不同之处在于bind改变this指向不是立即执行。而后者，call/apply改变
      this指向后，立即执行 */}
				{/* 1.插件Emoji Code的使用：键入ji根据提示选择需要的表情符号 */}
				{/* 2.插件 Emoji插件，ctrl+shift+p 选择insert emoji ,进入选择emoji框，然后直接enter */}
				{/* 3.git Emoji commit中文版，点击源代码管理器中笑脸图标，会弹出选择emoji的下拉菜单供选择，即可切换 */}
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
				<hr />
				{/* 1.在vue中我们可以定义v-model指令实现双向数据绑定，数据变化页面跟着变化。但是，在React中就没有指令的概念，因此React默认
			是不支持双向绑定的。只实现了数据的单向绑定；案例：实现text文本框中实时输入内容，state随着输入内容的变化而变化 */}
				{/* 2.当我们为文本框的value绑定了state属性后，state属性中的内容渲染到了文本框内，但是不能更改了。添加一个readOnly
			内容变成了只读；如果想更改，必须为文本框绑定一个onChange事件，事件的逻辑自己定义 */}
				{/* 3.onChange要实时触发，和按钮不同。onChange={this.textChange},不能写成onChange={()=>{this.textChange}} */}
				{/* <input
					type="text"
					name="txt"
					id="txt"
					value={this.state.msg}
					readOnly
				/> */}
				<input
					type="text"
					className={myBind.txt}
					id="txt"
					value={this.state.msg}
					onChange={this.textChange}
					ref={this.myRef}
				/>
				<p>{this.state.msg}</p>
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
	// 方式1：使用document.getElementById取实时value值，不推荐
	// 方式2；使用ref myRef=React.createRef();
	// textChange = () => {
	// 	// 如果想要在文本框在触发onChange，同时把文本框最新的值保存到state中
	// 	console.log(this.myRef.current);
	// 	this.setState({
	// 		msg: this.myRef.current.value
	// 	});
	// };
	// 方式3；使用事件对象参数来拿到value值
	/**
	 *
	 * @ react16版本以上，打印e是看不到target的值的，target的值一直是null
	 * 原因：react官方解释：The SyntheticEvent objects are pooled.
	 * This means that the SyntheticEvent object will be reused and
	 * all properties will be nullified after the event handler has been called. For example, this won’t work:
	 *
	 * 如果要生效，需要在里面调用
	 *
	 */
	textChange = (e) => {
		// persist()方法阻止react重置它的属性，这样console.log才能正确的打印出e
		e.persist();
		console.log(e);
		// 最好放在setTimeout()中做一个延迟
		this.setState({
			msg: e.target.value
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
