/* 该文件专门为Person组件生成的action对象；*/
import { ADDPERSON } from './constant.js';

export const createPerson = (data) => ({
	type: ADDPERSON,
	data
});
