/**
 *
 * @ 比List.jsx更近一步
 * 渲染评论列表，添加一个评论，立即更新页面
 *
 */
import React from 'react';
// 导入子组件
import Base from './Base.jsx';
// 导入样式文件comment.less
import MyCom from '../../css/comment.less';
import axios from 'axios';
export default class Comment extends React.Component {
	// 定义文本框存储Ref的容器
	txtRef = React.createRef();
	// 定义文本域中的ref
	myRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			CommentList: [
				{ user: '李寻欢', content: '小李飞刀，例不虚发' },
				{ user: '陆小凤', content: '天下无双的轻功' },
				{ user: '乔峰', content: '教单于折箭，搵英雄泪' }
			],
			username: ''
			// proArr,存储上一次本地存储中的数据
			// proArr: null
		};
	}
	render() {
		return (
			<div className={MyCom.c_container}>
				{/* 添加一条评论，立即显示到评论列表中 */}
				<span>用户：</span>
				<input
					type="text"
					name="user"
					id="user"
					value={this.state.username}
					ref={this.txtRef}
					onChange={this.userChange}
				/>

				<textarea
					name="user"
					id="user"
					placeholder="请输入评论内容"
					className={MyCom.area}
					ref={this.myRef}
				></textarea>
				<button
					className={MyCom.commit}
					onClick={this.handle.bind(this)}
				>
					发表评论
				</button>
				<h3>评论列表案例</h3>
				{this.state.CommentList.map((item, index) => {
					return <Base {...item} key={index}></Base>;
				})}
			</div>
		);
	}
	// 初始化数据在componentWillMount钩子中进行
	// UNSAFE_componentWillMount() {
	// 	if (localStorage.getItem('list')) {
	// 		this.setState({
	// 			CommentList: JSON.parse(localStorage.getItem('list'))
	// 		});
	// 	}
	// }
	// static getDerivedStateFromProps(props, state) {
	// 	// 声明字符arr，存储每次启动时，localStorage中的数据
	// 	const arr = localStorage.getItem('list');
	// 	console.log(arr);
	// 	console.log(state.proArr);
	// 	if (arr !== state.proArr) {
	// 		return {
	// 			commentList: JSON.parse(arr),
	// 			proArr: JSON.parse(arr)
	// 		};
	// 	}
	// 	return null;
	// }
	componentDidMount() {
		if (localStorage.getItem('list')) {
			// 这个阶段，就是在组件渲染前，获取CommentList
			this.setState({
				CommentList: JSON.parse(localStorage.getItem('list'))
			});
		}
		axios.get("https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48").then(res=>{
			console.log(res);
		})
	}
	// userChange监听文本框中的内容的实时变化
	userChange = (e) => {
		// 组件阻止react重置它的属性。否则，e.target能够拿到变化的数据，但是在控制台e.target的值始终是null
		e.persist();
		this.setState({
			username: e.target.value
		});
	};
	// 提交评论按钮的事件处理函数
	handle() {
		// 获取文本框中的内容，很简单
		const user = this.state.username;
		const content = this.myRef.current.value;
		console.log(user, content);
		// 先在数组开始位置添加一个对象
		// 1.这一步必须在存储和更新操作this.setState之前，为的是使得数组CommentList发生变化
		this.state.CommentList.unshift({
			user: user,
			content: content
		});
		// JSON.stringify()将数组(也是一个对象)存入本地磁盘,掉电也能保存
		localStorage.setItem('list', JSON.stringify(this.state.CommentList));
		// 基于最新的CommentList渲染虚拟dom
		this.setState({
			CommentList: this.state.CommentList,
			// a.清空文本输入框中username值
			// 输入文本框的清空使用this.setState方法，username变化，导致onChange事件触发，进而清空了输入文本框
			username: ''
		});
		// b.清空user和content中内容
		this.myRef.current.value = '';
	}
}
