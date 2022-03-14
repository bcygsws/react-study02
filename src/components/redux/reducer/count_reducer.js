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
