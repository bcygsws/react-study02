/* 为Home组件实现多个子路由，配置文件 */
/* 有子路由的不要给父级加exact,匹配时先匹配到父级，然后子级 。比如Home组件，不能加exact*/
// const routes = [
// 	{
// 		path: '/home',
// 		component: Home,
// 		children: [{ path: '/home/context', component: Context }]
// 	},
// 	{
// 		path: '/movie',
// 		component: Movie,
// 		exact: true
// 	},
// 	{
// 		path: '/about',
// 		component: About,
// 		exact: true
// 	}
// ];
