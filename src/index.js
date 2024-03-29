/**
 *
 * @ axios和NProgress顶部进度条的配置(为有后台请求异步任务的组件，添加顶部进度条，提升体验)
 * 参考文档：
 * https://blog.csdn.net/DcTbnk/article/details/107720660?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5.pc_relevant_aa&utm_relevant_index=6
 * NProgress配置参考文档；
 * https://blog.csdn.net/m0_37890289/article/details/109739783
 *
 * 使用进度条NProgress的基本步骤
 * 1.引入nprogress包，考虑到nprogress结合后端请求数据，而axios有拦截器，因此还需要引入axios包
 * 2.获取配置后的axios实例，const instance=axios.create({配置对象})
 * 3.进度条配置NProgress.configure({配置对象})：
 * 其他配置参考：https://blog.csdn.net/m0_37890289/article/details/109739783
 * trickle：false;表示不显示细长进度条
 * showSpinner:true;显示旋转进度条
 * easing:'ease';进度条动画类型
 * speed:500 进度条速度，表示在500ms内完成进度条从0到100%长度
 * parent:'body' 表示要挂载的dom节点，默认为body;使用默认值就好，这个NProgress属性可以不用配置了
 *
 *
 */
import axios from 'axios';
// 导入nprogress组件和样式
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 创建一个新的axios instance
const instance = axios.create({
	timeout: 2000 // 新的axios实例，统一配置请求的延迟时间
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
// axios实例.interceptors.request.use(success cb,fail cb);
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
