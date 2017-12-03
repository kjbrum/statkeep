import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/Login'
import Dashboard from '@/components/User/Dashboard'
import Profile from '@/components/User/Profile'

Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: '*',
			redirect: '/login'
		},
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: 'Login'
			}
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			meta: {
				title: 'Profile',
				requiresAuth: true
			}
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				title: 'Dashboard',
				requiresAuth: true
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	document.title = `${to.meta.title} - StatKeep`;

	if (requiresAuth && !currentUser) next('login');
	else if (!requiresAuth && currentUser) next('dashboard');
	else next();
})

export default router
