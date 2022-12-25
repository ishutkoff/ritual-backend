import { createStore } from 'vuex'
import shops from './modules/shops'
import products from './modules/products'
import services from './modules/services'
import categories from './modules/categories'
import auth from './modules/auth'
import { defaultFetchOptions } from './../defaultFetchOptions'

export default createStore({
	modules: {
		shops,
		products,
		services,
		categories,
		auth,
	},
})
