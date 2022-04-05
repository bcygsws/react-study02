/* 该文件专门为Coun组件生成的action对象；
action的值为对象是同步，为函数是异步*/
import { INCREMENT, DECREMENT } from './constant.js';

export const incrementAction = (data) => ({ type: INCREMENT, data });

export const decrementAction = (data) => ({ type: DECREMENT, data });

export const incrementActionAsync = (data, time) => {
	// redux-thunk处理异步数据流
	return (dispatch) => {
		setTimeout(() => {
			dispatch(incrementAction(data));
		}, time);
	};
};
