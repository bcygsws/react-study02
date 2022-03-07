import React from 'react';
// 导入antd中的日历控件
import { DatePicker } from 'antd';
// // 引入DatePicker依赖的样式,在App.jsx文件中引入
// import 'antd/dist/antd.css';
export default class Movie extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>这是About组件</h3>
				<DatePicker />
			</div>
		);
	}
}
