/**
 *
 * 组件通信方式七：
 * window.x="定义数据"
 * 在其他组件中使用window.x获取
 *
 *
 */
import React from 'react';
export default class GlobalMode extends React.Component {
	render() {
		return (
			<div>
				<h2>window变量实现组件通信，很简单，不做具体演示</h2>
			</div>
		);
	}
}
