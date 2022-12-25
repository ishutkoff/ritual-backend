import * as VueRouter from 'vue-router'
import ShopsList from './../components/ShopsList.vue'
import SingleShop from './../components/SingleShop.vue'
import Auth from './../components/Auth.vue'
import store from './../store'

const routes = [
	{ path: '/auth', name: 'auth', component: Auth },
	{
		path: '/',
		name: 'shop-list',
		meta: {
			requiresAuth: true,
		},
		component: ShopsList,
	},
	{
		path: '/shop/:id',
		name: 'single-shop',
		meta: {
			requiresAuth: true,
		},
		component: SingleShop,
	},
	{
		path: '/shop/:id/products',
		name: 'shop-products',
		meta: {
			requiresAuth: true,
		},
		component: SingleShop,
	},
	{
		path: '/shop/:id/services',
		name: 'shop-services',
		meta: {
			requiresAuth: true,
		},
		component: SingleShop,
	},
]

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!store.getters.isLoggedIn && !localStorage.jwt) {
			next({ name: 'auth' })
		} else {
			next()
		}
		next()
	} else {
		next()
	}
})

export default router
