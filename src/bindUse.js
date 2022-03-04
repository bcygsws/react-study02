/**
 *
 * @ bind的三大作用
 * 一、函数绑定
 * 二、偏函数，为函数设定一个预定值
 * 三、setTimeout中使用，也是改变this指向
 * bind绑定是有返回值的，其返回值是：返回一个原函数的拷贝，并拥有指定的 this 值和初始参数
 * 见MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 * 【理解Array.prototype.slice.call(arguments)】
 * https://www.cnblogs.com/papi/p/9234964.html
 * 结合mdn文档：
 * 和理解 Array.prototype.slice.call( arguments)的含义
 * 本质是
 * pre=f1.bind(null,37)
 * pre(1,2)
 *
 * 等价于调用了3个参数(37,1,2)
 *
 *
 */
// list中不要传参，因为你不知道要传几个参数，让它使用默认的arguments来读取参数表列即可

function list() {
	return Array.prototype.slice.call(arguments);
}
function addArg(arg1, arg2) {
	return arg1 + arg2;
}
const list1 = list(1, 2, 3); // [1,2,3]
console.log(list1);
const preFirst = list.bind(null, 37);
const list2 = preFirst(1, 2);
console.log(list2); // [37,1,2]

const add1 = addArg(1, 2);
console.log(add1); // 3
const pre = addArg.bind(null, 37);
const add2 = pre(2, 3); // addArg只有两个参数；37已经是第一个参数了，addArg只接收2,3被借去掉了
console.log(add2); // 39
