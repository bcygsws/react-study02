/**
 *
 * hook分支
 * 计数器小案例；理解react的生命周期
 *
 * 组件层次：
 * 父组件 main.js
 * 子组件为 Counter.jsx
 * 
 *
 */
// 组件创建和生命周期依赖的包react
import React from 'react';
// react@15.3 以上，类型校验需要单独安装prop-types包
import ReactTypes from 'prop-types';
export default class Counter extends React.Component {
	myRef = React.createRef();
	constructor(props) {
		super(props); // 出现extends关键字，要调用一下父组件的构造函数，有参数，就传参数
		// 初始化数据
		console.log(props); // {initVal: '0'}
		console.log(typeof props.initVal); // string类型
		// 居然不是number类型。在属性中传递number型，应该使用initVal={0}，而不是initVal="0"，此时，上面两行代码的输出是：
		// {initVal:0}
		// number
		this.state = {
			msg: 'ok',
			count: props.initVal
		};
		console.log(this.myRef);
	}

	// 组件即将要挂载，还没有开始渲染虚拟DOM--->类比vue中的created阶段
	// 类比：React17中，该钩子被抛弃；使用有返回值的静态方法getDerivedStateFromProps代替
  // 回顾vue生命周期钩子：https://blog.csdn.net/weixin_48337566/article/details/116057090
	
	// componentWillMount() {
	// 	// 此时还不能操作虚拟dom
	// 	console.log(document.getElementById('myVal')); // null
	// 	// 但是在此之前，state数据已经初始化了，可以访问
	// 	console.log(this.state.msg); // ok
	// 	// 调用自定义函数myFun,在组件即将挂载阶段，已经可以调用自定义函数了
	// 	this.myFun(); // 这是我自定义的函数myFun，和生命周期无关
	// }
	/**
	 * @ defaultProps
	 * 在一个组件中，一定有一些数据是必须的。哪怕用户又没有传这种【启动参数】。这是组件内部默认给自己提供一个默认值。这是一种保护机制
	 * a.本例中，如果在main.js中为Counter组件传递了属性。就使用属性传递的值。
	 * 		问题来了？传递过来的值如果不是数字怎么办？
	 * 要进行类型校验，【类型校验】。类型校验 
	 * 1.需要安装另外一个包，prop-types。
	 * 说明：在React 15.3版本以下，做类型校验，不需要额外安装包prop-types，这个包当时被集成在react@15 这个包中
	 * 当前 react@16 已经将类型校验包抽离出来了，所以需要额外安装包prop-types
	 * 
	 * 2.声明方式和defaultProps类似，也是定义成静态类型数据
	 * static propTypes={
	 * 	initVal:ReactTypes.number
	 * }
	 * 3.类型校验以后，会提示一个警告，期望number类型，却传递了字符串
	 * checkPropTypes.js:20 Warning: Failed prop type: Invalid prop `initVal` of type `string` supplied to `Counter`, expected `number`.
	 in Counter
	 *
	 * b.如果没有为Counter组件传值，则默认走默认属性defaultProps中的值
	 *
	 * 在class类中，定义一个静态成员defaultProps
	 * static defaultProps={initVal:0};
	 *
	 */
	static defaultProps = { initVal: 0 };
	static propTypes = {
		initVal: ReactTypes.number
	};
	// 自定义函数
	myFun() {
		console.log('这是我自定义的函数myFun，和生命周期无关');
	}
	// 渲染虚拟DOM的函数,开始渲染虚拟dom，render函数执行完，就完成了虚拟dom的创建。但是页面上尚未真正显示dom元素
	render() {
		// 在return之前虚拟dom还没有创建完成，自然也是拿不到的。当return执行完，虚拟dom才能创建完成
		// console.log(document.getElementById('myVal')); // null
		/**
		 *
		 * React中ref属性获取原生对象
		 * 参考：https://mayouchen.blog.csdn.net/article/details/81218688?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_default&utm_relevant_index=1
		 * 1.ref="myRef",this.refs.myRef拿原生对象，已经被弃用
		 * 2.改为ref function的方式,推荐
		 * 例如：<span ref={(ele)=>{this.myRef=ele;}}></span>
		 * this.myRef就是原生对象
		 *
		 * 3.在React 的16.3版本以后，在构造函数中，使用
		 * 	3.1 this.myRef= React.createRef();的方式，然后绑定到获取的那个原生对象上
		 * 	3.2 <span ref={this.myRef}></span>
		 *	3.3 this.myRef.current拿到原生对象
		 *
		 * react16.3版本以后，引入的React.createRef和React.forwardRef
		 *
		 *
		 */
		//
		// console.log(this.refs.pRef || this.refs.pRef.innerHTML);// 已经弃用
		// console.log(this.myRef.pRef && this.myRef.pRef.innerHTML);
		console.log(this.myRef);
		console.log(this.myRef.current); // 就可以获取原生对象了
		// a.开始渲染时，下面的结果0变成1时，下面的结果：this.myRef.current结果是null。下面的也是null
		// b.属性改变，从变成1，this.myRef.current对象有了，前面为真。这个表达式的值取决于后面，运行阶段，
		// render再次执行模板还没更新。this.myRef.current.innerHTML。拿到的是旧值0，更新后的值在componentDidUpdate中才能拿到
		// c.对比钩子componentDidUpdate中打印结果，那个阶段才变成1
		console.log(this.myRef.current && this.myRef.current.innerHTML);
		// 但是ref在react 16.3以后，已经被弃用了。myRef=React.createRef();
		// 调用后可以返回一个容器，该容器可以存储被ref锁表示的节点,该容器是专人专用的，创建ref容器
		// 但是，属性改变以后，渲染函数会再次执行，打印结果就不是null了。结果为：<div id="myVal">4</div>
		return (
			<div>
				<h3>这是Counter计数器组件</h3>
				<input type="button" value="+1" onClick={this.addHandle} />
				<hr />
				<h4>计数器现在的值：</h4>
				{/*<p id="myVal">{this.props.initVal}</p> */}
				{/* <p id="myVal" ref="pRef"> */}
				<p id="myVal" ref={this.myRef}>
					{this.state.count}
				</p>
			</div>
		);
	}
	// 点击事件-事件处理函数
	addHandle = () => {
		// 将会报类型错误：TypeError: Cannot assign to read only property 'initVal' of object '#<Object>'
		// 原因是：不论function组件还是class组件，接收的属性都是只读的。如果想改变，要想办法建立属性和state中数据的关联。
		// 在state中增加一个变量，count:props.initVal; 那么count是state中的数据，就可以进行读写操作了
		// this.props.initVal++;
		console.log(this); // 指向Counter实例
		this.setState({
			count: this.state.count + 1
		});
	};
	// 数据、虚拟dom、页面三者一致，这个钩子执行完，进入组件运行阶段。这个钩子是最早可以操作dom的最早的钩子;这个钩子执行
	// 完，就将进入【运行中】状态
	// 类比vue中的mounted
	UNSAFE_componentDidMount() {
		console.log(document.getElementById('myVal')); // <p id="myVal">0</p>
	}
	// 接收到属性，是否变化;nextProps参数是数据变化后的DOM
	// 注意：这个钩子在本组件中，没有接受到变化的属性。本组件中state变化，直接走shouldComponentUpdate,然后是componentWillUpdate这个路径
	// 在TestReceiveProps.jsx组件中做演示,下面的钩子书写后，这个钩子没有执行
	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps);
	// }
	// 	// 组件是否要更新。该钩子中必须翻译一个布尔值。返回是false,不会继续执行后面的生命周期函数，而是直接退回了【运行中】
	// 状态，后面的render函数不渲染，页面就不更新。但是，state中count值被修改了
	// nextProps是向子组件传递的值，是旧值。nextState也是一个对象，里面是state变化后的值
	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps); // {initVal:0}  还是属性变化前的值
		console.log(nextState); // {msg:'ok',count:1}  state中的值已经发生改变
		// console.log(typeof nextState.count); // number
		/* 需求：如果count值是偶数更新页面，count值是奇数不更新页面 */
		// if (nextState.count % 2 === 0) {
		// 	return true;
		// } else {
		// 	return false;
		// }
		// return 的返回值控制页面是否更新
		// return true; // 此处返回true。数据和页面都是4。此处写false,数据变成了4，但是页面上还是3
		// return nextState.count % 2 === 0 ? 'true' : 'false';
		return true; // 让它一直更新，以确保后面的生命周期函数能够执行
	}
	// 	// 组件即将更新，此时还没有开始重新渲染虚拟DOM。但是数据已经更新完成了
	UNSAFE_componentWillUpdate(nextProps, nextState) {
		// 获取的dom还是旧的，是更新以前的
		console.log(document.getElementById('myVal').innerText);
		console.log(
			'nextProps中initVal:' +
				nextProps.initVal +
				'\tnextState中count:' +
				nextState.count
		);
	}
	// 	// 组件的新数据、重新渲染的虚拟DOM和新页面保持一致
	componentDidUpdate(prevProps, prevState) {
		// 拿到的prevProps和prevState都是旧的对象
		console.log(prevProps, prevState); // 变成1后，这两个对象都拿到的是旧值{initVal: 0} {msg: 'ok', count: 0}
		console.log(this.myRef.current && this.myRef.current.innerHTML); // 1
	}
}
