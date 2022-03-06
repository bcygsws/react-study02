import React from 'react';
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// 路由参数对象
			rParams: props.match.params
		};
	}
	render() {
		console.log(this);
		return (
			<div>
				<h3>这是Movie组件</h3>
				{/* 路由参数的获取，太长了，直接挂载到构造函数上 */}
				<p>{this.state.rParams.type}</p>
				<p>{this.state.rParams.id}</p>
			</div>
		);
	}
	UNSAFE_componentWillMount() {
		// 需求：在App.jsx中配置的带参数的路由/movie/top250/10，参数要获取到，根据这些参数，去后台请求数据，这在项目中非常普遍
		// vue中 this.$route.params获取带参数的路由的参数值
		// React中使用this.props.match.params获取参数数据
		console.log(this.props.match.params);
	}
}
