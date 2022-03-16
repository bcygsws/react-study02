// 导入constant常量文件
import { ADD, REMOVE } from '../constant.js';
// 工资基本数额，假设为10000
const preState = 10000;
export default function moneyReducer(state = preState, action) {
	const { type, data } = action;
	switch (type) {
		case ADD:
			return (state = state + data);
		case REMOVE:
			return (state = state - data);
		default:
			return state;
	}
}
