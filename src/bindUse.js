/**
 *
 * @ bind的三大作用
 * 一、创建绑定函数   bind是执行时绑定
 * 二、偏函数，为函数设定一个预定值
 * 三、setTimeout中使用，也是改变this指向
 * bind绑定是有返回值的，其返回值是：返回一个原函数的拷贝，并拥有指定的 this 值和初始参数
 * 见MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 * 【理解Array.prototype.slice.call(arguments)】
 * https://www.cnblogs.com/papi/p/9234964.html
 * 结合mdn文档：
 * 和理解 Array.prototype.slice.call(arguments)的含义
 * 本质是
 * pre=f1.bind(null,37)
 * pre(1,2)
 *
 * 等价于调用了3个参数(37,1,2)
 *
 * @什么情况下为bind、call、apply传入一个null或者undefined呢？
 * 参考文档：https://blog.csdn.net/weixin_41652865/article/details/105226377
 * 1.将数组参数展开为列表参数
 * 特别注意
 * f.bind(thisArg,[,arg1[,arg2[,arg3]]])
 * 如果bind里面参数为空，或者thisArg值为null或者undefined，那么执行作用域的this将被当做是绑定后创建的新函数的thisArg
 * 2.将传入的参数进行柯里化（预设一个参数），下面有两个例子
 * 下面的apply(null,[1,2])或者bind(null,37)都使用了null
 * apply或bind方法都需要传入一个this对象，如果我们不关注this对象，传入一个null,作为占位符就很合适
 *
 * 仅演示，展开数组参数
 * function sum(a,b){
 * 	console.log("a:"+a,"b:"+b);
 * }
 * 短列表，指得call;长数组，指apply
 * sum.apply(null,[1,2]);// 打印结果：a:1,b:2
 *
 */
// list中不要传参，因为你不知道要传几个参数，让它使用默认的arguments来读取参数表列即可
// 一、创建绑定函数
window.x = 81;
const module = {
	x: 42,
	getX: function () {
		return this.x;
	}
};
console.log(module.getX()); // 42
// 做一个变量替换赋值以后
const unbindGetX = module.getX;
// bind是执行时绑定，unbindGetX()调用时，默认绑定他的是window。从window中寻找x，然后返回
console.log(unbindGetX()); // 81

// 同样使用替换赋值，使用bind修改this指向
const bindGetX = module.getX.bind(module);
// 同样是执行时绑定，getX中this的指向已经通过bind绑定做了修改
console.log(bindGetX()); // 42
/**
 *
 * @ call和apply更改this指向
 *
 *
 *
 */
window.y = 88;
const module1 = {
	y: 47,
	getY: function () {
		return this.y;
	}
};
const bindGetY = module1.getY; // 这个第三方变量bindGetY接收的过程，丢失了this原来的指向module1
console.log(bindGetY()); // 88
// 对比，bind绑定使用，call/apply来更改this指向
console.log(module1.getY.call(module1)); // 47
// 1.call/apply更改this指向后立即执行
// 2.call和apply只是临时更改了一次this的指向
// 下面一行调用bindGetY发现还是使用的是window中的y值
console.log(bindGetY()); // 88

// 二、偏函数-最基本的用途就是使得函数有一个预设的初始值
function list() {
	// 功能：Array的slice方法将传入的列表参数转化为一个数组
	return Array.prototype.slice.call(arguments);
}
function addArg(arg1, arg2) {
	return arg1 + arg2;
}
const list1 = list(1, 2); // [1,2]
console.log(list1);
const preFirst = list.bind(null, 37);
console.log(preFirst(1, 2, 3)); //  [37,1,2,3]
/* 
preFirst在被list.bind(null,37)赋值后，list实际上变成下面的情形，给list增加了第一个预设参数
function list(37,arg1,arg2,……){
	return Array.prototype.slice.call(arguments)
}





*/

// 1.没有设定初始值的情形
// const add1 = addArg(1, 2);
// console.log(add1); // 3
// 2.设置初始参数值值37
const pre = addArg.bind(null, 37);
const add2 = pre(2, 3); // addArg只有两个参数；37已经是第一个参数了，addArg只接收2,数字3被截取掉了
console.log(add2); // 39

// 三、和定时器一起使用，也是更改this指向，主要是setTimeout默认是window.setTimeout
function LateBloomer() {
	this.petalCount = Math.ceil(Math.random() * 12) + 1; // petal花瓣的意思
}
// 定义两个原型方法
LateBloomer.prototype.bloom = function () {
	// 正常setTimeout时，延时的事件处理函数this指向window；window中并没有delay函数，我们将delay函数也定义成了一个原型方法，
	// 故而需要使用bind,改变this的指向
	window.setTimeout(this.delay.bind(this), 1000);
};
LateBloomer.prototype.delay = function () {
	console.log('I am a flower with:' + this.petalCount);
};
const flower = new LateBloomer(); // new时，做三件事：分配空间存flower实例对象、构造函数执行、返回实例this
flower.bloom();
/**
 *
 * new 创建对象时做三件事：
 * 参考文档：https://blog.csdn.net/m0_47531829/article/details/123770057
 * 三件事总结：
 * 1.创建一个新对象，将新对象的隐式原型(_proto_)赋值给构造函数的显式原型(prototype)
 * 2.将构造函数的作用域赋值给新对象，执行构造函数的代码，为新对象添加属性
 * 3.返回新对象
 *
 *
 */
