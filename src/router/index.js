// --
import Layout from 'layouts/Layout.svelte';


import Home from 'views/Home.svelte';

import Create from 'views/Create.svelte';

import Receive from 'views/Receive.svelte';

import Leaderboard from 'views/Leaderboard.svelte';



const routes = [
	{
		name: '/',
		component: Home,
		layout: Layout,
	},
	{
		name: '/create',
		component: Create,
		layout: Layout,
	},
	{
		name: '/receive/:slug',
		component: Receive,
		layout: Layout,
	},
	{
		name: '/leaderboard/:slug',
		component: Leaderboard,
		layout: Layout,
	},
];


export { routes };


