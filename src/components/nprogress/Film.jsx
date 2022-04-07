/**
 *
 * @ 电影列表组件，体会nprogress顶部进度条的使用
 * 创建类组件 rcc+回车
 * 创建函数组件 rfc+回车
 *
 *
 */
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
// 导入电影列表组件
import FilmList from './FilmList.jsx';
export default class Film extends Component {
	render() {
		return (
			<div>
				<h3>这是电影列表组件，体会顶部进度条的使用</h3>
				<Link to="/home/film/list">渲染的电影列表</Link>
				<Route path="/home/film/list" component={FilmList}></Route>
			</div>
		);
	}
}
