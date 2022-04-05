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

//合并拆分的所有的reducer
/**
 *
 * combineReducers({
 *  mapStateToProps中的键1: 对应的reducer1
 *  mapStateToProps中的键2: 对应的reducer2
 *  mapStateToProps中的键3: 对应的reducer3
 *
 * })
 *
 */
const allReducer = combineReducers({
	count: countReducer, // 等价于count:countReducer(state.count,action)
	person: personReducer, // 等价于person:personReducer(state.person,action)
	money: moneyReducer
});
// 中间件，参考文档：http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html
// applyMiddleware(thunk,promise,logger)三个参数顺序不能改变
export default createStore(allReducer, applyMiddleware(thunk));

// const reducer = combineReducers({
// 	a: doSomethingWithA,
// 	b: processB,
// 	c: c
// });

// 上面代码等同于，合并成一个大的reducer
// function reducer(state = {}, action) {
//   return {
//     a: doSomethingWithA(state.a, action),
//     b: processB(state.b, action),
//     c: c(state.c, action)
//   }
