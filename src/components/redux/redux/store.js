/*该文件专门用于暴露一个store对象，整个应用只有一个store对象*/

import { createStore, applyMiddleware, combineReducers } from 'redux';
//引入为Count组件服务的reducer
import countReducer from '../reducer/count_reducer.js';
//引入为Person组件服务的reducer
import personReducer from '../reducer/person_reducer.js';
// 引入为Salary组件服务的reducer
import moneyReducer from '../reducer/money_reducer.js';
//引入redux-thunk中间件，用于支持异步action
import thunk from 'redux-thunk';

//汇总所有的reducer
const allReducer = combineReducers({
	count: countReducer,
	person: personReducer,
	money: moneyReducer
});
// 中间件，参考文档：http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html
// applyMiddleware(thunk,promise,logger)三个参数顺序不能改变
export default createStore(allReducer, applyMiddleware(thunk));
