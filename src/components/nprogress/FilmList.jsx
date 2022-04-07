/**
 *
 * @ 渲染电影列表
 *
 *
 *
 */
import React, { Component } from 'react';
// 导入axios封装好的请求函数get,向后台发起数据请求
import { get } from '../../index.js';
import Sub from './Sub.jsx';
class FilmList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}
	render() {
		return (
			<div>
				<h3>这是电影列表</h3>
				{this.circleRender()}
			</div>
		);
	}
	// 请求电影列表
	// top250数据接口
	UNSAFE_componentWillMount() {
		get(
			'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=50&lang=Cn'
		).then((res) => {
			console.log(res.data);
			this.setState({
				list: res.data
			});
		});
	}
	// 循环渲染函数circleRender
	circleRender = () => {
		return this.state.list.map((item, index) => {
			return <Sub {...item.data[0]} key={index}></Sub>;
		});
	};
}
export default FilmList;
