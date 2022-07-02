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
 */
import React from 'react';
export default class Count17 extends React.Component {
	constructor(props){
		super(props);
		this.state={
			info:'演示React17生命周期钩子'
		}
	}
	render() {
		return (
			<div>
				<h3>演示React17生命周期钩子 </h3>
			</div>
		);
	}

}
