/**
 *
 * React组件通信八：
 * context实现跨级组件的通信
 * context实现跨级组件通信的步骤
 *
 * context特性实现跨级组件通信
 * 传统父子都要校验的方式；
 * getChildContextTypes
 * 前三 后三 后二,使用驼峰命名法
 * 两个静态属性：childContextType contextTypes
 * 一个方法：getChildContext
 *
 * 创建Context对象的方式
 * a. const MyContext=React.CreateContext('默认值');
 * b. 发送数据的祖父组件用MyContext.Provider包裹
 * <MyContext.Provider value={某个值}></MyContext.Provider>
 *
 * c.接收有两种方式
 *  c1. <MyContext.Consumer>{value=>{进行渲染}}</MyContext.Consumer>
 *  c2. 校验MyContext，this.context拿到祖先组件注入的数据，但是这种接收方式只适用于类组件
 *  static contextType=MyContext;
 * 或者
 * 孙子组件.contextTypes=MyContext;
 * this.context就直接拿到注入的value值，这是和传统方式的区别，传统方式使用this.context.info才能拿到数据
 *
 *
 */
import React from 'react';
const MainContext = React.createContext();
const { Provider } = MainContext;
// 类型校验
export default class ContextCom2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: '祖父组件 data to 孙子ContextE'
		};
	}
	render() {
		const { info } = this.state;
		return (
			<div>
				<h2>这是演示ContextCom2组件实现跨级通信</h2>
				<Provider value={info}>
					<Son2></Son2>
				</Provider>
			</div>
		);
	}
}
class Son2 extends React.Component {
	render() {
		return (
			<div>
				<h3>这是Son2子组件</h3>
				<GrandSon2></GrandSon2>
			</div>
		);
	}
}
class GrandSon2 extends React.Component {
	// 这种contextType方式，仅适用于类组件
	static contextType = MainContext;
	render() {
		return (
			<div>
				<h5>这是GrandSon2子组件</h5>
				<p>{this.context}</p>
			</div>
		);
	}
}
