// console.log('ok');
// 一、使用react，要安装两个基本的包：react、react-dom
// 1.1 react主要用于组件创建和生命周期相关的包
// 1.2 react-dom主要封装了操作dom相关的包
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// 导入Redux相关的
// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import createStore from './components/redux/redux/store.js';
// 引入子组件DivCom,子组件必须暴露一个接口
// 导入类学习文件
import MyClass from './class_study.js';
import MyClass2 from './class_study2.js';
import './bindUse.js';
// import DivCom from './components/DivCom.jsx';
// // 导入Hello2组件
// import Hello2 from './components/Hello2.jsx';
// // 导入渲染的循环列表组件List
// import List from './components/List.jsx';
// // 导入计数器组件
// import Counter from './components/Counter.jsx';
// import Parent from './components/TestReceiveProps.jsx';
// import BindThis from './components/ThisBind.jsx';
// import Fat from './components/SonToFat.jsx';
// import Comment from './components/Comment.jsx';
// import MyContext from './components/context/Context.jsx';
// 导入样式文件，在react-scripts@2.0.0 版本以上已经支持样式模块化了
// import './css/add.less'; // 这是属于子组件SubList的样式，在那个组件中引入
// function DivCom(props) {
// 	// g.通过属性传递过来的数据都是只读的，不能够修改
// 	// 例如：在函数组件中props.name="李红"，这是错误的，函数组件内部接收的属性props只读，不能重新赋值
// 	return (
// 		<div>
// 			这是一个div
// 			<p className="sty">雨打梨花深闭门，孤负青春，虚负青春。</p>
// 			<label htmlFor="ab12">这是label标签</label>
// 			{
// 				// 这是注释的中正确写法
// 			}
// 			{/* 这是注释，这种写法只占了一行，推荐这种方式 */}
// 			{/* 和vue中双花括号渲染很不一样，使用单引号，渲染变量值 */}
// 			<p>
// 				{props.name}---{props.age}
// 			</p>
// 		</div>
// 	);
// }
// 二、react创建dom元素，只能使用react提供的JS API来创建，不能像vue那样手写html
// createElement接收三个及其以上的参数：
/**
 *
 * 参数一：string，元素标签
 * 参数二：{},表示创建的这个元素身上有哪些属性
 * 参数三、放置一个或多个虚拟dom元素。表示子元素，多个子元素之间用逗号,隔开
 *
 *
 */
// null是个空对象，不配置属性
// a.创建原生对象
// let h3 = React.createElement('h3', null, '我是h3标题');
// let myDiv = React.createElement('div', { title: '我是myDiv', id: 'myDiv' }, h3);
// 使用上面的方式创建元素，非常低效。react官方就提出了一套js语法规范

// 问题：那么jsx(符合XML语法规范) 的原理是什么？
// 哪怕在js中可以写jsx语法。但是，在jsx内部，也是把createElement创建html这样的片段的代码转换而来。也就是说即使我们通过
// jsx语法创建的html渲染出来，其内部也是通过js的api createElement创建并渲染出来(JSX是对程序员友好的语法糖)

// 类似字面量的方式创建了一个组件
/**
 *
 * @ 如果在jsx语法内部写js代码，那么所有对的js代码必须写在{}花括号内
 * 例如：title属性值，用变量代替（vue中是用绑定的方式实现，:title）
 * 下面的代码片段是jsx语法，其内部只能写js表达式；其外部可以js代码【举例循环创建10个p标签】
 *
 * a.jsx标签里面同样可以写属性，直接给属性值仍然是"属性值"
 * 如果属性值是个变量，变量要用花括号{变量}包裹
 *
 * b.jsx中如果添加类样式，用关键字className(控制台中解析成了class)，而不会使用class,class是创建类组件的关键字，后面用到
 *
 * c.label标签中for属性也是关键字，<label for=""></label>。for属性名用htmlFor代替
 *
 * d.在jsx创建html代码，所有的节点最后必须由唯一的根元素包裹，这和vue中template需要唯一的根元素时一样的
 * 
 * e.jsx内部写注释
 *    单行注释：// 直接当做问呢
      多行注释：/* 当做文本 */ // 多行注释;
//     html注释写进jsx直接报错 <!-html注释写进去直接报错-->
// {
// 这是Jsx内部注释正确的写法
// }
/*
 */
// 空数据存储10个p对象
// let arr = [];
// for (let i = 0; i < 10; i++) {
// 	let p = <p key={i}>jsx内部只能写js表达式</p>;
// 	arr.push(p);
// }
// const titleVal = 'h3标题';
// /* {<h3 title="h3标题">这是标题</h3>} */
// let myDiv = (
// 	<div>
// 		这是一个div
// 		<h3 title={titleVal}>这是标题</h3>
// 		<p className="sty">雨打梨花深闭门，孤负青春，虚负青春。</p>
// 		<label htmlFor="ab12">这是label标签</label>
// 		{arr}
// 		{
// 			// 这是注释的中正确写法
// 		}
// 		{/* 这是注释，这种写法只占了一行，推荐这种方式 */}
// 	</div>
// );
// 上述代码报错，原因是webpack不识别这种尖括号写的html。需要安装插件babel-preset-react,通过这个插件来解析
// 插件安装完成后，还需要在.babelrc文件的presets节点中声明一下

// react的优点组件化、模块化，像vue一样一个组件是一个单元，然后分离成单个页面(.vue文件)

// c. react中组件名必须大写，然后使用一对标签引入到ReactDOM的第一个参数中
// d. 把这个组件DivCom抽离成一个单独的jsx文件

// h.在组件中如果要使用外部传递过来的数据，要显式的接收一下，props属性
// function DivCom(props) {
// 	// g.通过属性传递过来的数据都是只读的，不能够修改
// 	// 例如：在函数组件中props.name="李红"，这是错误的，函数组件内部接收的属性props只读，不能重新赋值
// 	return (
// 		<div>
// 			这是一个div
// 			<p className="sty">雨打梨花深闭门，孤负青春，虚负青春。</p>
// 			<label htmlFor="ab12">这是label标签</label>
// 			{
// 				// 这是注释的中正确写法
// 			}
// 			{/* 这是注释，这种写法只占了一行，推荐这种方式 */}
// 			{/* 和vue中双花括号渲染很不一样，使用单引号，渲染变量值 */}
// 			<p>
// 				{props.name}---{props.age}
// 			</p>
// 		</div>
// 	);
// }
// i.抽离子组件到src/components文件夹下，子组件中依赖react，同时向外暴露一个默认接口。然后引入到main.js中
// e.向这个子组件DivCom传值
// let name = '萧别离';
// let age = 20;
// f.如果传入一个对象呢？
// let person = {
// 	name: '张三',
// 	age: 15,
// 	gender: '男',
// 	address: '上海'
// };
// // main.js相当于父组件了，这个在ReactDOM.render(<DivCom></DivCom>)引入也证明了这一点
// // 实现父组件向子组件传值，直接DivCom上绑定这个值即可

// // b.放置在指定容器渲染html片段
// //  把上述用js书写的html对象放到容器app中
// // ReactDOM.render(myDiv, document.getElementById('app'));

// // 用class类的方式创建组件
// // 向子组件Hello2传入数据
// let info = '这是向Hello2子组件传递的数据';
// 1. 在function定义的组件中，拿到props值要先进行显式调用，而class定义的组件中，传递的属性可以
// 直接this.props.键名可以直接获取，无需显式的定义参数props。props也是制度的（区别：class组件在构造器中声明的this.state数据
// 是组件的私有数据，可读可写）
// 2. 对于向子组件传递的数据{...person} 获取传值时，无需出现person了，直接是props.name或者this.props.name就可以拿到值了
// 原因是:{...person} 相当于name={name} age={age} address={address}。在render函数中打印了this.props对象结构，也能验证
// 这一点
// 3.class类定义组件时，内部有一个构造函数，即时没有定义，系统会自动生成一个构造函数，也可以将构造函数显式的定义
// 4.使用了extends继承父类了React.component，一定要在子组件中出现super()调用一下
// 5.和在render函数中访问props属性，使用this.props不同。如果在构造函数中访问props,并不使用this.props了。而是在构造器中引入
// 参数props,那么直接把形参props拿过来使用即可
// 6.在构造函数除了处理参数props以外，还有一个重要的东西state。this.state,this.state中存放的是当前组件的私有数据。这类似于vue
// 中的data(){return {};}。在render中代码片段（或者叫虚拟DOM）中访问当前组件的私有数据，直接使用this.state.键名来访问
// class Hello2 extends React.Component {
// 	// constructor() {
// 	// 	super();
// 	// 	console.log(this.props); // undefined
// 	// }
// 	constructor(props) {
// 		super();
// 		// 和在render函数打印的this.props结果一致
// 		console.log(props); // {info: '这是向Hello2子组件传递的数据', name: '张三', age: 15, gender: '男', address: '上海'}
// 		// 定义组件Hello2的私有数据
// 		this.state = {
// 			msg: '这是Hello2组件的私有数据',
// 			info: '《艳骨》静姝'
// 		};
// 	}
// 	render() {
// 		console.log(this.props); // {info: '这是向Hello2子组件传递的数据', name: '张三', age: 15, gender: '男', address: '上海'}
// 		{
// 			/* Strict mode checks are run in development mode only; they do not impact the production build. 相关文档：https://reactjs.org/docs/strict-mode.html*/
// 		}
// 		return (
// 			<React.StrictMode>
// 				<div>
// 					<h3>这是class类创建的组件</h3>
// 					<p>
// 						父组件中传递过来的数据{this.props.info}---
// 						{this.props.address}
// 					</p>
// 					<p>组件Hello2的私有数据渲染:{this.state.msg}</p>
// 					{/* 点击下面的按钮修改上面的this.state中msg的值:注意：1.不能使用js中原生onclick方法*/}
// 					{/* 1.1 不能使用vue中 @click的形式而是使用“驼峰命名法”onClick；2. */}
// 					{/* 1.2 事件的值应该是函数的调用，是js代码，肯定会用花括号，还需要使用this。因为changeMsg在和当前元素并列的函数，调用时
// 				用{this.changeMsg} */}
// 					<input
// 						type="button"
// 						value="点击按钮修改私有数据msg的值"
// 						onClick={this.changeMsg}
// 					/>
// 				</div>
// 			</React.StrictMode>
// 		);
// 	}
// 	// 直接报错：main.js:219 Uncaught ReferenceError: changeMsg is not defined
// 	// changeMsg() {
// 	// 	// 注意：这里不是传统网页，在react中自定义事件处理函数中this指向undefined，并不是指向调用者
// 	// 	// 解决办法：事件处理函数使用ES6中的箭头含糊
// 	// 	console.log(this); // 打印出来是undefined
// 	// 	this.state.msg = '当前组件的私有数据msg值被改变了';
// 	// }
// 	// 箭头函数不改变this的指向，this指向到组件实例了
// 	changeMsg = () => {
// 		console.log(this); // Hello2 {props: {…}, context: {…}, refs: {…}, updater: {…}, changeMsg: ƒ, …}
// 		// 点击按钮后，可以在打印的this中看到msg的值确实被改变了，但是 页面没有刷新
// 		// this.state.msg = '私有数据msg值被改变了';
// 		// 解决bug:打印的实例中，this.state.msg的值确认被改变了，但是页面没有刷新。换句话说，这种改变数据的方式并不能触发页面的更新:
// 		// 1.react中使用this.setState({})来改变私有数据值，并更新页面
// 		// 2.并且this.setState中对象中只填入要改变的值，没改变的值如info：state:{msg:'',info:''}不会被覆盖
// 		// 3.setState中也支持一个函数参数，来改变私有数据的值
// 		// this.setState({
// 		// 	msg: '私有数据msg值被改变了'
// 		// });
// 		// 4.函数参数的方式和上面等效
// 		// this.setState(function () {
// 		// 	return { msg: '私有数据msg值被改变了' };
// 		// });
// 		// 5.函数参数还支持传递参数，第一个参数是要改变属性之前的旧值，第二个参数是其他组件绑定上的属性
// 		// this.setState(function (preVal, props) {
// 		// 	console.log(preVal);
// 		// 	console.log(props);
// 		// 	console.log(this.state.msg); // 命名已经改变了，打印的是还是旧值，类似vue中$nextTicks
// 		// 	return { msg: '私有数据msg的值被改变了' };
// 		// 	// 6.this.setState()调用时，改变值这个过程是异步执行的，修改msg后拿到的msg值可能是旧的
// 		// });
// 		// 7.解析方案：在setState中传入第二个函数参数，这种回调的方式，在jquery中也经常使用
// 		this.setState(
// 			function (preVal, props) {
// 				console.log(this.state.msg);
// 				return { msg: '私有数据msg的值被改变了' };
// 			},
// 			function () {
// 				console.log(this.state.msg);
// 			}
// 		);
// 	};
// }
// 创建store
// const store = createStore();
// 把Hello2组件也单独抽离出去
ReactDOM.render(
	// <DivCom name={name} age={age}></DivCom>,
	// ...person中用到扩展符，表示属性扩散，
	<Provider store={createStore}>
		<App></App>
	</Provider>,
	document.getElementById('app')
);
