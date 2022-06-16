/* 该文件用于创建一个为Count组件服务的reducer*/

import { INCREMENT, DECREMENT } from '../constant.js';

const initState = 0;
export default function countReducer(preState = initState, action) {
	const { type, data } = action;
	switch (type) {
		case INCREMENT:
			return preState + data;
		case DECREMENT:
			return preState - data;
		default:
			return preState;
	}
}
/**
 * 加+1后
 * 1.返回一个新的state，用伪代码说明：
 * 
 * 伪代码
 * const newState=countReducer(0,{
 * 	type:'INCREMENT'，
 * 	data:1
 * })
 * 
 * 2.新的状态通过createStore(allReducers,applyMiddware(thunk))进入store状态管理仓库
 * 3.再通过react-redux包中Provider组件统一注入到根组件中，供各级子组件渲染界面使用{this.props.count}
 * <Provider store={store}>
 *  <App/>
 * </Provider>
 * 
 * 
 * 
 */
/**
 * count组件的4种行为，映射成了3种action，纯函数中的两种分支
 *
 * @ Reducer功能：接收action,计算得到新的state
 * Reducer纯函数：同样的输入必然得到同样的输出
 * 三点注意事项
 * 参考阮一峰：https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
 * 1.不能修改参数
 * 2.不能调用I/O的api
 * 3.在纯函数中不能够调用Math.random()和Date.now()等不纯的方法，因为每次的结果都不一样
 *
 *
 */
