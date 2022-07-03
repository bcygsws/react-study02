/**
 *
 * @ 比较不同版本的路由，v4和v5
 *
 * 参考文档：
 * https://blog.csdn.net/Vue2018/article/details/100559895?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-2-100559895.pc_agg_new_rank&utm_term=hashrouter+%E5%B5%8C%E5%A5%97&spm=1000.2123.3001.4430
 *
 *
 *
 *
 */
import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import routes from '../../utils/routes.js';
export default class UsingRouter extends React.Component {
	render() {
		return (
			<div>
				<h3>比较react-router的v4和v5版本</h3>
				{/* 在UsingRouter下设置两级路由，使用两层map来循环遍历 + routes.js，第一层<Route render=（props)=>{}></Route> */}
				{/* 利用render渲染第二层路由 */}
				<Switch>
					{routes.map((route, index) => {
						<Route
							path={route.path}
							key={index}
							render={(props) => {
								if (route.children) {
									return (
										<div>
											<route.component
												props={props}
											></route.component>
											<Switch>
												{route.children.map(
													(item, i) => {
														return (
															<Route
																path={item.path}
																component={
																	item.component
																}
																key={i}
															/>
														);
													}
												)}
												{/* 不存在二级路由，重定向到第一个二级路由 */}
												<Redirect
													to={route.children[0].path}
												/>
											</Switch>
										</div>
									);
								} else {
									return (
										<route.component
											props={props}
										></route.component>
									);
								}
							}}
						/>;
					})}
					<Redirect
						from="/home/router_version"
						to="/home/router_version/first"
					/>
				</Switch>
			</div>
		);
	}
}
