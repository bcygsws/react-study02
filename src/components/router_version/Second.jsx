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
export default class Second extends React.Component {
	render() {
		return (
			<div>
				<h5>第二层路由Second</h5>
				{/* 在UsingRouter下设置两级路由，使用两层map来循环遍历 */}
			</div>
		);
	}
}
