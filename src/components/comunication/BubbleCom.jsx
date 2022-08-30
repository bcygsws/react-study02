/**
 *
 * 组件通信方式三；dom事件机制实现通信
 * @ dom事件机制实现通信
 * 要区分：e.target和ref对象
 * e.target 拿到的是引起冒泡的事件源对象，但是它并不是子组件实例
 * 而ref才是子组件实例
 *
 *
 */
import React from 'react';
export default class BubbleCom extends React.Component {
	constructor(props) {
		super(props);
		// 父组件私有数据
		this.state = {
			msg: '我是父组件原来的数据'
		};
	}
	render() {
		return (
			<div>
				<h3>这是dom事件机制通信父组件</h3>
				<div onClick={this.handleClick}>
					<MyChild></MyChild>
				</div>
				<p>{this.state.msg}</p>
			</div>
		);
	}
	handleClick = (e) => {
		// 拿到引起冒泡的事件源对象（div），但是它不是像ref那样拿到的子组件实例
		// 因此，e.target中没有mySon()这个方法
		console.log(e.target);
	};
}
class MyChild extends React.Component {
	constructor(props) {
		super(props);
		// 子组件私有数据
		this.state = {
			info: '子组件私有数据-江山故宅空文藻'
		};
	}
	render() {
		return (
			<div
				style={{ width: 300, height: 300, backgroundColor: 'hotpink' }}>
				<h4>这是dom事件机制通信子组件</h4>
			</div>
		);
	}
	mySon = () => {
		return this.state.info;
	};
}
/**
 * 回顾dom
 * 一、dom的发展
 * DOM文档对象模型，定义了访问html和xml文档的标准接口，与语言和平台无关
 * DOM0 提供了操作web文档内容的api,但未形成标准，实现混乱
 * DOM1 简化了dom的操作，如js中的document对象
 * DOM2 在原有基础上扩充鼠标等细分模块，增加了对css的支持；比如：getComputedStyle(),会引起回流
 * DOM3 增加了dom的加载和保存（Load and Save）模块、验证模块（XPathEvaluator）、DOM的核心扩展
 * 二、dom事件级别
 * DOM 0
 * 最普通的方式
 * 原生obj.onclick=function(){} // 绑定事件
 * 
 * 
 * 原生obj.onclick=null // 解绑事件
 *
 * 
 * DOM2事件的处理方式：
 * 绑定事件：原生obj.addEventListener('click',f,false) false可以不写，默认是false,表示在冒泡阶段执行
 * 解绑事件：原生obj.removeEventListener('click',f,false) false可以不写，默认是false,表示在冒泡阶段执行
 * 兼容性处理，对于IE8以下，使用attachListener()和detachListener()
 *
 * 
 * DOM3事件的处理方式：
 * 使用 【事务工具包类】UtilEvent
 * utilEvent.addListener(input对象,'textInput',f),三个参数是要绑定事件的对象、事件名称和事件处理函数
 *
 *
 * 三、dom事件流
 * 参考文档：https://blog.csdn.net/Moony_wy/article/details/122813290
 *
 * dom事件流是指事件发生时，会按照特定的顺序传播，叫做事件流
 *
 * 捕获阶段
 * 目标元素
 * 冒泡阶段
 *
 * 记忆：5个要点都提到冒泡
 * 3.1 js代码只能执行捕获或冒泡中的一个阶段
 * 3.2 onclick和attachEvent（DOM2兼容低版本IE,attachEvent和detachEvent）只得到冒泡阶段
 * 3.3 如果addEventListener第三个参数为true,得到捕获阶段；缺省或者false值时，处理冒泡阶段
 * 3.4 实际开发中，我们更关注冒泡阶段
 * 3.5 有些事件是没有冒泡的，onfocus、onblur、onmouseenter、onmouseleave
 * ### 事件的三个阶段
 * 捕获、目标、冒泡
 *
 * 四、介绍事件“捕获”和“冒泡”执行顺序和事件的执行次数？
 *
 * 按照 W3C 标准的事件：首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段
 *
 * 事件执行次数（DOM2-addEventListener）：元素上绑定事件的个数
 * -   注意 1：前提是事件被确实触发【确实触发】
 * -   注意 2：事件绑定几次就算几个事件，即使类型和功能完全一样也不会“覆盖”【不会覆盖】
 *
 * 事件执行顺序：判断的关键是否目标元素
 *
 * -   非目标元素：根据 W3C 的标准执行：捕获->目标元素->冒泡（不依据事件绑定顺序）
 * -   目标元素：依据事件绑定顺序：先绑定的事件先执行（不依据捕获冒泡标准）
 * -   最终顺序：父元素捕获->目标元素事件 1->目标元素事件 2->子元素捕获->子元素冒泡->父元素冒泡
 * -   注意：子元素事件执行前提 事件确实“落”到子元素布局区域上，而不是简单的具有嵌套关系(比如使用定位，将子盒子移出了父盒子区域)
 *
 * DOM事件执行顺序案例：
 * E:\web-prj\7.javascriptTest\36-事件的执行捕获、冒泡顺序.html
 * 
 * GIT commit的描述文字不规范，推送到远程了，如何修改？
 * 参考文档：http://t.zoukankan.com/yadongliang-p-15097062.html
 * 参考文档2：https://www.jianshu.com/p/c101edfbb6d8   修改 git commit --amend 
 * 参考文档3：https://www.php.cn/tool/git/484979.html  丢弃某次commit pick改成
 *
 */
