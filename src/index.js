/**
 *
 * @ axios和NProgress顶部进度条的配置(为有后台请求异步任务的组件，添加顶部进度条，提升体验)
 * 参考文档：
 * https://blog.csdn.net/DcTbnk/article/details/107720660?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5.pc_relevant_aa&utm_relevant_index=6
 * NProgress配置参考文档；
 * https://blog.csdn.net/m0_37890289/article/details/109739783
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
