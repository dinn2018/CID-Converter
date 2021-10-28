import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	}
]

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes,
})

export default router
