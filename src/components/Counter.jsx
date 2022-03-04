/* 计数器小案例；理解react的生命周期 */
// 组件创建和生命周期依赖的包react
import React from 'react';
// react@15.3 以上，类型校验需要单独安装prop-types包
import ReactTypes from 'prop-types';
export default class Counter extends React.Component {
	constructor(props) {
		super(props); // 出现extends关键字，要调用一下父组件的构造函数，有参数，就传参数
		// 初始化数据
		console.log(props); // {initVal: '3'}
		console.log(typeof props.initVal);// string类型
		// 居然不是number类型。在属性中传递number型，应该用initVal={3}。而不是initVal="3"
		this.state = {
			msg: 'ok',
			count: props.initVal
		};
	}
	// 组件即将要挂载，还没有开始渲染虚拟DOM--->类比vue中的created阶段
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
		console.log(document.getElementById('myVal')); // null
		return (
			<div>
				<h3>这是Counter计数器组件</h3>
				<input type="button" value="+1" onClick={this.addHandle} />
				<hr />
				<h4>计数器现在的值：</h4>
				{/*<p id="myVal">{this.props.initVal}</p> */}
				<p id="myVal">{this.state.count}</p>
			</div>
		);
	}
	// 点击事件-事件处理函数
	addHandle = () => {
		// 将会报类型错误：TypeError: Cannot assign to read only property 'initVal' of object '#<Object>'
		// 原因是：不论function组件还是class组件，接收的属性都是只读的。如果想改变，要想办法建立属性和state中数据的关联。
		// 在state中增加一个变量，count:props.initVal; 那么count是state中的数据，就可以进行读写操作了
		// this.props.initVal++;
		this.setState({
			count: this.state.count + 1
		});
	};
	// 数据、虚拟dom、页面三者一致，这个钩子执行完，进入组件运行阶段。这个钩子是最早可以操作dom的最早的钩子;这个钩子执行
	// 完，就将进入【运行中】状态
	// 类比vue中的mounted
	componentDidMount() {
		console.log(document.getElementById('myVal')); // <p id="myVal">的确传值了，但是传递的是个字符串哈哈哈</p>
	}
	// 接收到属性，是否变化
// 	componentWillReceiveProps(nextProps) {}
// 	// 组件是否要更新
// 	shouldComponentUpdate(nextProps, nextState) {}
// 	// 组件即将更新，此时还没有开始重新渲染虚拟DOM
// 	componentWillUpdate(nextProps, nextState) {}
// 	// 组件的新数据、重新渲染的虚拟DOM和新页面保持一致
// 	componentDidUpdate(nextProps, prevState) {}
}
