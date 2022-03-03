import React from 'react';
// 用class类的方式创建组件
// 向子组件Hello2传入数据
// 1. 在function定义的组件中，拿到props值要先进行显式调用，而class定义的组件中，传递的属性在render函数中可以
// 直接this.props.键名可以直接获取，无需显式的定义参数props。props也是只读的（区别：class组件在构造器中声明的this.state数据
// 是组件的私有数据，可读可写）
// 2. 对于向子组件传递的数据{...person} 获取传值时，无需出现person了，直接是props.name或者this.props.name就可以拿到值了
// 原因是:{...person} 相当于name={name} age={age} address={address}。在render函数中打印了this.props对象结构，也能验证
// 这一点
// 3.class类定义组件时，内部有一个构造函数，即时没有定义，系统会自动生成一个构造函数，也可以将构造函数显式的定义
// 4.使用了extends继承父类了React.component，一定要在子组件中出现super()调用一下
// 5.和在render函数中访问props属性，使用this.props不同。如果在构造函数中访问props,并不使用this.props了。而是在构造器中引入
// 参数props,那么直接把形参props拿过来使用即可
// 6.在构造函数除了处理参数props以外，还有一个重要的东西state。this.state,this.state中存放的是当前组件的私有数据。这类似于vue
// 中的data(){return {};}。在render中代码片段（或者叫虚拟DOM）中访问当前组件的私有数据，直接使用【this.state.键名】来访问
export default class Hello2 extends React.Component {
	// constructor() {
	// 	super();
	// 	console.log(this.props); // undefined
	// }
	constructor(props) {
		super();
		// 和在render函数打印的this.props结果一致
		console.log(props); // {info: '这是向Hello2子组件传递的数据', name: '张三', age: 15, gender: '男', address: '上海'}
		// 定义组件Hello2的私有数据
		this.state = {
			msg: '这是Hello2组件的私有数据',
			info: '《艳骨》静姝'
		};
	}
	render() {
		console.log(this.props); // {info: '这是向Hello2子组件传递的数据', name: '张三', age: 15, gender: '男', address: '上海'}
		{
			/* Strict mode checks are run in development mode only; they do not impact the production build. 相关文档：https://reactjs.org/docs/strict-mode.html*/
		}
		return (
			<React.StrictMode>
				<div>
					<h3>这是class类创建的组件</h3>
					<p>
						父组件中传递过来的数据{this.props.info}---
						{this.props.address}
					</p>
					<p>组件Hello2的私有数据渲染:{this.state.msg}</p>
					{/* 点击下面的按钮修改上面的this.state中msg的值:注意：1.不能使用js中原生onclick方法*/}
					{/* 1.1 不能使用vue中 @click的形式而是使用“驼峰命名法”onClick；2. */}
					{/* 1.2 事件的值应该是函数的调用，是js代码，肯定会用花括号，还需要使用this。因为changeMsg在和当前元素并列的函数，调用时
				用{this.changeMsg} */}
					<input
						type="button"
						value="点击按钮修改私有数据msg的值"
						onClick={this.changeMsg}
					/>
				</div>
			</React.StrictMode>
		);
	}
	// 直接报错：main.js:219 Uncaught ReferenceError: changeMsg is not defined
	// changeMsg() {
	// 	// 注意：这里不是传统网页，在react中自定义事件处理函数中this指向undefined，并不是指向调用者
	// 	// 解决办法：事件处理函数使用ES6中的箭头含糊
	// 	console.log(this); // 打印出来是undefined
	// 	this.state.msg = '当前组件的私有数据msg值被改变了';
	// }
	// 箭头函数不改变this的指向，this指向到组件实例了
	changeMsg = () => {
		console.log(this); // Hello2 {props: {…}, context: {…}, refs: {…}, updater: {…}, changeMsg: ƒ, …}
		// 点击按钮后，可以在打印的this中看到msg的值确实被改变了，但是 页面没有刷新
		// this.state.msg = '私有数据msg值被改变了';
		// 解决bug:打印的实例中，this.state.msg的值确认被改变了，但是页面没有刷新。换句话说，这种改变数据的方式并不能触发页面的更新:
		// 1.react中使用this.setState({})来改变私有数据值，并更新页面
		// 2.并且this.setState中对象中只填入要改变的值，没改变的值如info：state:{msg:'',info:''}不会被覆盖
		// 3.setState中也支持一个函数参数，来改变私有数据的值
		// this.setState({
		// 	msg: '私有数据msg值被改变了'
		// });
		// 4.函数参数的方式和上面等效
		// this.setState(function () {
		// 	return { msg: '私有数据msg值被改变了' };
		// });
		// 5.函数参数还支持传递参数，第一个参数是要改变属性之前的旧值，第二个参数是其他组件绑定上的属性
		// this.setState(function (preVal, props) {
		// 	console.log(preVal);
		// 	console.log(props);
		// 	console.log(this.state.msg); // 命名已经改变了，打印的是还是旧值，类似vue中$nextTicks
		// 	return { msg: '私有数据msg的值被改变了' };
		// 	// 6.this.setState()调用时，改变值这个过程是异步执行的，修改msg后拿到的msg值可能是旧的
		// });
		// 7.解析方案：在setState中传入第二个函数参数，这种回调的方式，在jquery中也经常使用
		this.setState(
			function (preVal, props) {
				console.log(preVal);// state的旧值，{msg: '这是Hello2组件的私有数据', info: '《艳骨》静姝'}
				console.log(props);// 父组件或其他组件传递过来的属性值
				console.log(this.state.msg);
				return { msg: '私有数据msg的值被改变了' };
			},
			function () {
				console.log(this.state.msg);
			}
		);
	};
}
