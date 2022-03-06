import React from 'react';
import DivCom from '../components/DivCom.jsx';
// 导入Hello2组件
import Hello2 from '../components/Hello2.jsx';
// 导入渲染的循环列表组件List
import List from '../components/List.jsx';
// 导入计数器组件
import Counter from '../components/Counter.jsx';
import Parent from '../components/TestReceiveProps.jsx';
import BindThis from '../components/ThisBind.jsx';
import Fat from '../components/SonToFat.jsx';
import Comment from '../components/Comment.jsx';
import MyContext from '../components/context/Context.jsx';
let person = {
	name: '张三',
	age: 15,
	gender: '男',
	address: '上海'
};
let info = '这是向Hello2子组件传递的数据';
// 导入Context组件
export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>这是Home组件</h3>
				<DivCom {...person}></DivCom>
				<Hello2 info={info} {...person}></Hello2>
				<List></List>
				{/* 计数器组件，注释掉下面一行。不为initVal传默认属性，让它走defaultProps这个途径，获取默认值 */}
				{/* <Counter initVal="3"></Counter> */}

				{/* a.不传值，走defaultProps  */}
				{/* 	<Counter></Counter> */}

				{/* 传递了值，但是该值是字符串，和数字1相加，成了拼接字符串。这个时候需要在Counter中对数据类型，进行【类型校验】*/}
				{/* <Counter initVal="的确传值了，但是传递的是个字符串哈哈哈"></Counter> */}
				{/* 同样错误，这样传值，在state:props.initVal接收后，得到的值是字符串类型，传number,应该使用initVal={3} */}
				{/* <Counter initVal="3"></Counter> */}
				<Counter initVal={0}></Counter>
				{/* 单独演示生命周期钩子componentWillReceiveProps */}
				<Parent></Parent>
				<BindThis></BindThis>
				{/* 子组件给父组件传值的两种方式 */}
				<Fat></Fat>
				{/* 评论列表案例 */}
				<Comment></Comment>
				{/* Context的用途，getChildContextProps 记忆：前三、后三、后二，1方法，两静态属性 */}
				<MyContext></MyContext>
			</div>
		);
	}
}
