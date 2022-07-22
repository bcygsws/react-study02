/**
 *
 *  @ 演示React16.4版本以后，getDerivedStateFromProps
 * 参考文档：
 * 简书：https://www.jianshu.com/p/26d7667f35ef
 *
 *
 *
 *
 */
import React from 'react';
import Son from './Son.jsx';
import Son1 from './Son1.jsx';
export default class Fat extends React.Component {
	render() {
		return (
			<div>
				<h4>父组件</h4>
				<Son color="#ee2322"></Son>
				<Son1 color="#aabbee"></Son1>
			</div>
		);
	}
}
