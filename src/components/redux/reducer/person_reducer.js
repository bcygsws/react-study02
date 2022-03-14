/* 该文件用于创建一个为Person组件服务的reducer*/

//redux初始化状态 以后组件reducer多了也可以写成对象
import { ADDPERSON } from '../constant.js';

const initState = [{ id: 1, name: 'tom', age: 18 }];
export default function personReducer(preState = initState, action) {
	const { type, data } = action;
	switch (type) {
		case ADDPERSON:
			return [data, ...preState];
		default:
			return preState;
	}
}
