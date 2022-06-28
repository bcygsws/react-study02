/**
 *
 * 组件通信方式四；dom事件机制实现通信
 * @dom事件机制实现通信
 * 要区分：e.target和ref对象
 * e.target 拿到的是引起冒泡的事件源对象，但是它并不是子组件实例
 * 而ref才是子组件实例
 *
 *
 */
import React from 'react';
export default class BubbleCom extends React.Component {
	constructor(props) {
		super(props);
		// 父组件私有数据
		this.state = {
			msg: '我是父组件原来的数据'
		};
	}
	render() {
		return (
			<div>
				<h3>这是dom事件机制通信父组件</h3>
				<div onClick={this.handleClick}>
					<MyChild></MyChild>
				</div>
				<p>{this.state.msg}</p>
			</div>
		);
	}
	handleClick = (e) => {
		// 拿到引起冒泡的事件源对象（div），但是它不是像ref那样拿到的子组件实例
		// 因此，e.target中没有mySon()这个方法
		console.log(e.target);
	};
}
class MyChild extends React.Component {
	constructor(props) {
		super(props);
		// 子组件私有数据
		this.state = {
			info: '子组件私有数据-江山故宅空文藻'
		};
	}
	render() {
		return (
			<div
				style={{ width: 300, height: 300, backgroundColor: 'hotpink' }}
			>
				<h4>这是dom事件机制通信子组件</h4>
			</div>
		);
	}
	mySon = () => {
		return this.state.info;
	};
}
/**
 * 回顾dom
 * 一、dom的发展
 * DOM文档对象模型，定义了访问html和xml文档的标准接口，与语言和平台无关
 * DOM0 提供了操作web文档内容的api,但未形成标准，实现混乱
 * DOM1 简化了dom的操作，如js中的document对象
 * DOM2 在原有基础上扩充鼠标等细分模块，增加了对css的支持；比如：getComputedStyle(),会引起回流
 * DOM3 增加了dom的加载和保存（Load and Save）模块，验证模块（XPathEvaluator）、DOM的核心扩展
 * 二、dom事件级别
 * DOM 0 
 * 最普通的方式
 * 原生obj.onclick=function(){} // 绑定事件
 * 原生obj.onclick=null // 解绑事件
 * 
 * DOM2事件的处理方式：
 * 绑定事件：原生obj.addEventListener('click',f,false) false可以不写，默认是false,表示在冒泡阶段执行
 * 解绑事件：原生obj.removeEventListener('click',f,false) false可以不写，默认是false,表示在冒泡阶段执行
 * 
 * 兼容性处理，对于IE8以下，使用attachListener()和detachListener()
 * 
 * DOM3事件的处理方式：
 * 使用 【事务工具包类】UtilEvent
 * utilEvent.addListener(input对象,'textInput',f)
 * 
 * 
 * 三、dom事件流
 * 
 * 
 * 
 * 
 * 
 * 
 */