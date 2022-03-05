import React from 'react';
import ReactTypes from 'prop-types';
export default class GrandSon extends React.Component {
	/* 注意：如果要使用祖父级组件传递过来的数据，使用这个Context特性时，在传递和接收处都要做属性校验 */
	// 后二那个属性
	static contextTypes = {
		fontSize: ReactTypes.number
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				{/* this.props就是一个对象了，外层就包裹一层花括号就可以了 */}
				<h5 style={this.props}>这是孙子组件</h5>
				<p style={{ fontSize: this.context.fontSize + 'px' }}>
					我的字体大小，祖父组件决定
				</p>
			</div>
		);
	}
}
