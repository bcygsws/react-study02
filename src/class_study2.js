// 定义一个Person类
class Person {
	// 构造函数不显式写系统内部也会自动生成
	constructor(name, age) {
		console.log(3);
		this.name = name;
		this.age = age;
	}
	// 父类的成员方法，下面验证，子类可以继承
	say() {
		console.log('这是父类中的say方法');
	}
	static info = '父类静态变量：晓看天色暮看云，行也思君，坐也思君';
	// 父类的静态属性，下面验证，子类名.info也可以调用
	static sayGood() {
		console.log('父类静态方法');
	}
}
class Chinese extends Person {
	constructor(name, age, color, language) {
		console.log(1);
		// 使用extends关键字实现继承，那么子类的constructor函数必须调用super方法，super方法父类的构造器的一个引用
		// super语句必须定义在自由属性color和language前面
		super(name, age);
		this.color = color;
		this.language = language;
		console.log(2);
	}
	// 子类的say方法
	say() {
		console.log('这是子类的say方法');
	}
	// static info = '子类静态变量：晓看天色暮看云，行也思君，坐也思君';
	// // 父类的静态属性，下面验证，子类名.info也可以调用
	// static sayGood() {
	// 	console.log('子类静态方法');
	// }
}
let p1 = new Person('朱红', 13); // 执行3
console.log(p1);
let c1 = new Chinese('张珊', 22, 'yellow', '中文'); // 它的构造中执行的是1,3,2
console.log(c1);
// 参考java,文档：https://www.cnblogs.com/coder-who/p/8419184.html
// 主要结论在Java中：
// 一、子类和父类同名的static是相互独立的，不存在重写的关系
// 二、子类不能继承父类的static变量和方法，但是可以访问
// 子类实力调用say方法,这和java中有巨大的区别，java的向上转型Person child=new Chinese();child.say()方法会返回子类的内容
c1.say(); // 这是子类的say方法
p1.say(); // 这是父类的say方法
// 子类调用父类的静态变量
console.log(Chinese.info); // 子类静态变量：晓看天色暮看云，行也思君，坐也思君
console.log(Chinese.sayGood()); // 子类静态方法

/**
 *
 * @ 当父类和子类中有相同的静态变量和静态方法时，子类类名.静态成员只能拿到的自身的值
 * 当子类调用父类的静态成员时（注释掉了子类中的静态成员），子类类名.静态成员能访问到父类的值
 *
 */

//  真正面向对象语言有三部分组成：封装、继承、多态
// js中没有多态，多态和接口、虚拟方法有关。但是可以模拟多态
// 多态分为重载多态和重写多态，这是重写多态
class Animal {
	say() {
		// 只有say方法这个壳，方法体中没有内容，模拟面向对象的多态

	}
}
class Dog extends Animal {
	say() {
		console.log('小狗汪汪叫');
	}
}
class Cat extends Animal {
	say() {
		console.log('小猫汪汪叫');
	}
}
