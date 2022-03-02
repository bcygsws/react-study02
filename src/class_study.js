// console.log('哈哈');
// js中创建类的方法
function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.sayHi = function () {
	console.log('原型上的方法，实例通过原型链也是可以调用的哦~');
};
let person = new Person('张三', 13);
console.log(person);
console.log(person.__proto__);
console.log(person.__proto__.__proto__);
console.log(person.__proto__.__proto__.__proto__);
person.sayHi();

class People {
	constructor(name, gender) {
		this.name = name;
		this.gender = gender;
	}
	say() {
		console.log('ok 2');
	}
	// 声明并初始化一个静态变量
	static info = 123;
	// 声明静态方法
	static sayHello() {
		console.log('见面说hello');
	}
}
let p = new People('张金', '男');
console.log(p);
p.say();
// 静态变量info，类似java。静态成员只能同过类名.属性 类名.方法调用。并且使用实例调用静态成员时，
// 调用静态属性返回undefined，调用静态方法直接报错，提示not a function
console.log(p.info); // undefined
console.log(People.info); // 123
People.sayHello();
// p.sayHello(); // 将报错
