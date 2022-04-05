import React from 'react';
import Loadable from 'react-loadable';

export default (loader) => {
	// loader,实际上等于loader:loader，传入的loader键值是一个组件
	return Loadable({
		loader,
		// loading方法返回懒加载的组件
		loading() {
			return <div>加载中……</div>;
		}
	});
};
/**
 * 参考文档
 * react-loadable的简单实现
 * https://www.cnblogs.com/geck/p/12547678.html
 *
 * 1.https://zhuanlan.zhihu.com/p/25874892
 * 2.官方文档：https://github.com/jamiebuilds/react-loadable
 *
 * react组件懒加载的四种方式
 * https://www.jianshu.com/p/2ee461f5f8cc
 *
 *
 *
 */

// React懒加载深入-实现一个函数，模拟react-loadable插件的功能
// 简易实现，在页面和组件之间加一层代理（高阶组件的属性代理和反向继承），通过文件异步加载实现“懒加载”
// const loadable = ({ loader, loading: Loading }) => {
// 	return class extends React.Component {
// 		state = {
// 			// 该有状态组件在render中要渲染的组件，默认设置为null,一个空对象。在生命周期钩子中，
// 			// 待文件异步加载完成后，this.setState更改它的值
// 			LoadedComponent: null
// 		};
// 		// 生命周期钩子componentDidMount
// 		componentDidMount() {
// 			// 在App.jsx文件中const Movie=loadable(()=>import('./views/Movie.jsx')),参数:()=>import('./views/Movie.jsx')
// 			// 是一个函数，就是loader
// 			// 用文件的异步加载模拟react的懒加载
// 			loader().then((res) => {
// 				// console.log(res.default);
// 				this.setState({
// 					LoadedComponent: res.default
// 				});
// 			});
// 		}
// 		render() {
// 			const LoadedComponent = this.state; // ES6解构
// 			// LoadedComponent为null，渲染Loading;不为null后，才渲染组件
// 			return LoadedComponent ? <LoadedComponent /> : <Loading />;
// 		}
// 	};
// };
