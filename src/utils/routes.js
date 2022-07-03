import First from '../components/router_version/First.jsx';
import Second from '../components/router_version/Second.jsx';
import Second2 from '../components/router_version/Second2.jsx';
let routes = [
	{
		path: '/home/router_version/first',
		component: First,
		children: [
			{
				path: '/home/router_version/first/second',
				component: Second
			},
			{
				path: '/home/router_version/first/second2',
				component: Second2
			}
		]
	}
];
export default routes;
