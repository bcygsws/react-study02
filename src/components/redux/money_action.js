// 导入reducer纯函数中传入的action的type常量
import { ADD, REMOVE } from './constant.js';
export const addMoney = (data) => ({ type: ADD, data });
export const removeMoney = (data) => ({
	type: REMOVE,
	data
});
