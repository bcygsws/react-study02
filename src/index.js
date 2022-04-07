/**
 *
 * @ axios和NProgress顶部进度条的配置(为有后台请求异步任务的组件，添加顶部进度条，提升体验)
 *
 *
 *
 */
import axios from 'axios';
// 导入nprogress组件和样式
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const instance = axios.create({
	timeout: 2000
});
export function get(url) {
	return instance.get(url);
}
// 配置nprogress，使用NProgress.configure()方法
const processConfig = {
	trickle: false, // 是否显示细长进度条
	showSpinner: true, // 是否显示旋转进度条
	easing: 'ease', // 进度条动画类型
	speed: 500 // 进度条速度
};
NProgress.configure(processConfig);
// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		NProgress.start();
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);
// 响应拦截器
instance.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	(err) => {
		return Promise.reject(err);
	}
);
