/**
 *
 * React组件通信八：
 * context实现跨级组件的通信
 * context实现跨级组件通信的步骤
 * https://blog.csdn.net/qzw752890913/article/details/125141227
 * https://blog.csdn.net/weixin_45745641/article/details/123489191
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
 *  c2. 校验MyContext
 *  static contextType=MyContext;
 * this.context就直接拿到注入的value值，这是和传统方式的区别，传统方式使用this.context.info才能拿到数据
 *
 */
import React from 'react';
// 导入子组件ContextD
import ContextD from './ContextD.jsx';
// 类型校验
import ReactTypes from 'prop-types';
export default class ContextCom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: '祖父组件 data to 孙子ContextE'
		};
	}
	render() {
		return (
			<div>
				<h2>这是演示ContextCom组件实现跨级通信</h2>
				<ContextD></ContextD>
			</div>
		);
	}
	getChildContext() {
		// 传递给孙子组件ContextE info的值
		return { info: this.state.info };
	}
	// 祖父组件中的校验
	static childContextTypes = {
		info: ReactTypes.string
	};
}
