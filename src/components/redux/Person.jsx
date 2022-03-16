import React from 'react';
import { connect } from 'react-redux';
import { createPerson } from './person_action.js';

//UI组件
class Person extends React.Component {
	state = {
		name: null,
		age: null
	};
	getName = (event) => {
		// 1.从 v17 开始，event.persist() 将不再生效，因为 SyntheticEvent 不再放入事件池中
		// 2.e.persist方法用于阻止react重置e.target属性，不加此方法，event.target打印结果为null
		event.persist();
		// console.log(event);
		this.setState({ name: event.target.value });
	};
	getAge = (event) => {
		// 1.从v17开始，event.persist()将不再生效，因为SynctheticEvent不再放入线程池中
		// 2.event.persist()方法可以阻止react重置event.target的值，导致打印出null
		event.persist();
		this.setState({ age: event.target.value });
	};
	add = () => {
		const { name, age } = this.state;
		const { person } = this.props;
		const id = person.length + 1;
		var personObj = { id, name, age };
		this.props.addPerson(personObj);
	};
	render() {
		return (
			<div>
				<h1>我是Person组件，上方组件求和为：{this.props.count}</h1>
				<input
					onChange={this.getName}
					type="text"
					placeholder="输入名字"
					name="name"
				/>
				<input
					onChange={this.getAge}
					type="text"
					placeholder="输入年龄"
					name="age"
				/>
				<button onClick={this.add}>添加</button>
				<ul>
					{this.props.person.map((item, index) => {
						return (
							<li key={index}>
								{item.name}--{item.age}
							</li>
						);
					})}
				</ul>
				<p>Salary当前工资为：{this.props.money}</p>
				<hr />
			</div>
		);
	}
}

//容器组件
export default connect(
	(state) => ({
		person: state.person,
		count: state.count,
		money: state.money
	}),
	{
		addPerson: createPerson
	}
)(Person);
