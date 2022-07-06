/**
 *
 * @在React16.4之后的版本，生命周期钩子发生了重要的变化
 * 变化历程：
 * 1. 16.4到17之前的版本，添加一些前缀：UNSAFE_ + 钩子名，可以消除 浏览器控制台 的一些警告
 * 2. 在react17之后，彻底抛弃了
 * componentWillMount  静态有返回值的方法；getDerivedStateFromProps取代之前的
 * componentWillReceiveProps 静态有返回值的方法；getDerivedStateFromProps取代之前的
 * componentWillUpdate  getSnapshotBeforeUpdate(解决：聊天气泡页滚动条往下掉的问题)
 * 三个生命周期钩子
 *
 * React.createRef()的用法
 * https://blog.csdn.net/weixin_33971977/article/details/86027673
 *
 * 面试：this.setState是同步还是异步？讲解的最透彻的文档，参考掘金
 * 掘金：https://juejin.cn/post/6918712057118507015
 * setState，先了解react的批量更新(batchUpdate)机制 的主要流程：
 * 1.调用setState(newState)
 * 2.newState存入队列
 * 3.判断是不是batchUpdate
 * 4.如果是batchUpdate,组件就会优先保存在脏组件dirtyComponents中；如果不是batchUpdate,就会遍历所有的脏组件，并更新它们
 * 因此，问题的落脚点在于：如何判断是否命中batchUpdate
 *
 * increase=>{
 * // 开始的时候，都默认命中batchUpdate,是异步
 * // isBatchingUpdates=true;
 * settimeout(()=>{
 *    // 这部分代码时异步宏任务，会放入队列，导致isBatchingUpdates立即又被置位false,导致setTimeout setInterval
 *    // 以及addEventListener等原生事件中，setState表现为同步；在普通方法和生命周期钩子中，表现为异步
 * },1000)
 * // isBatchingUpdates=false;
 *
 * }
 *
 *
 *
 *
 *
 *
 */
import React from 'react';
export default class Counter17 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: '演示React17生命周期钩子',
			count: props.initVal
		};
		this.myRef = React.createRef();
	}
	// 自定义方法，打印hello
	ptHello = () => {
		console.log('Hello React 17!');
	};
	handle = () => {
		// this.setState函数参数第一个是原来的状态（state旧值），第二个参数是父组件传递的props值
		// this.state(function(preState,props){},function(){
		// 拿到变化后的state值
		// })
		this.setState({
			count: this.state.count + 1
		});
	};
	render() {
		console.log(this);
		console.log(this.myRef.current);
		console.log(this.myRef.current && this.myRef.current.innerText);
		return (
			<div>
				<h3>演示React17生命周期钩子 </h3>
				<button onClick={this.handle}>值+1</button>
				<hr />
				<p ref={this.myRef}>{this.state.count}</p>
			</div>
		);
	}
	// 静态方法，必须给一个返回值，不返回新的state，返回一个null即可
	static getDerivedStateFromProps(props, state) {
		console.log(this);
		console.log(state, props);
		return null;
	}
	componentDidMount() {
		// 初始状态下，当数据挂载到页面阶段，this才不是undefined
		console.log(this);
		this.ptHello();
		console.log(this.myRef.current);
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps);
		console.log(nextState);
		return true;
	}
	// 使用它时，一般使用返回值，来作为其后面的一个钩子的第三参数
	// 具体应用；聊天气泡页，获取页面更新渲染的前一刹那的值，和更新渲染完成后中的值，做差值，来解决一些问题
	getSnapshotBeforeUpdate(preProps, preState) {
		console.log('getSnapshotBeforeUpdate', preProps, preState);
		return null;
	}
	// third参数是负责接收getSnapshotBeforeUpdate的返回值
	componentDidUpdate(preProps, preState, third) {
		console.log('componentDidUpdate', preProps, preState, third);
		// 再次打印原生对象中的innerText
		console.log(this.myRef.current && this.myRef.current.innerText);
	}
}
// 结果分析：
/*  
初始渲染时；
undefined // 初始化渲染时，getDerivedStateFromProps是静态方法，随着类创建而创建，此时this还拿不到组件对象，this为undefined
Counter17.jsx:106 {initVal: 0} {info: '演示React17生命周期钩子', count: 0}
Counter17.jsx:86 Counter17 {props: {…}, context: {…}, refs: {…}, updater: {…}, ptHello: ƒ, …} // render中可以拿到this组件了
Counter17.jsx:87 null
Counter17.jsx:88 null  // 初始渲染时，render在componentDidMount之前，还拿不到dom对象this.myRef.current为空
Counter17.jsx:100 Counter17 {props: {…}, context: {…}, refs: {…}, updater: {…}, ptHello: ƒ, …}
Hello React 17!
Counter17.jsx:102 <p>​0​</p>​

state中count值+1时
getDerivedStateFromProps-shouldComponentUpdate-render
undefined
Counter17.jsx:128 {info: '演示React17生命周期钩子', count: 1} {initVal: 0} 
Counter17.jsx:107 {initVal: 0}
Counter17.jsx:108 {info: '演示React17生命周期钩子', count: 1}
Counter17.jsx:86 Counter17 {props: {…}, context: {…}, refs: {…}, updater: {…}, ptHello: ƒ, …}
Counter17.jsx:87 <p>​1​</p>​ // 还是拿到p那个dom对象
Counter17.jsx:88 0 // 此时增加后的新数值1还没有挂载到页面上，this.myRef.current.innerText还是旧值0
Counter17.jsx:114 getSnapshotBeforeUpdate {initVal: 0} {info: '演示React17生命周期钩子', count: 0}
Counter17.jsx:120 componentDidUpdate {initVal: 0} {info: '演示React17生命周期钩子', count: 0}
Counter17.jsx:122 1

父组件传递的属性值变化，引起子组件生命周期钩子getDerivedStateFromProps执行
undefined
Counter17.jsx:131 {info: '演示React17生命周期钩子', count: 0} {initVal: 1} // getDerivedStateFromProps中initVal变化了
Counter17.jsx:107 {initVal: 1}  // shouldComponent(nextProps,nextState)中值变化了
Counter17.jsx:108 {info: '演示React17生命周期钩子', count: 0}
Counter17.jsx:86 Counter17 {props: {…}, context: {…}, refs: {…}, updater: {…}, ptHello: ƒ, …}
Counter17.jsx:87 <p>​0​</p>​
Counter17.jsx:88 0
Counter17.jsx:116 getSnapshotBeforeUpdate {initVal: 0} {info: '演示React17生命周期钩子', count: 0}
Counter17.jsx:123 componentDidUpdate {initVal: 0} {info: '演示React17生命周期钩子', count: 0} null
Counter17.jsx:125 0


*/
