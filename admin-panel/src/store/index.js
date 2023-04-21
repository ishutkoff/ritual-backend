import { createStore } from 'vuex'
import shops from './modules/shops'
import products from './modules/products'
import discounts from './modules/discounts'
import services from './modules/services'
import categories from './modules/categories'
import sketchCategories from './modules/sketch-categories'
import sketches from './modules/sketches'
import monuments from './modules/monuments'
import auth from './modules/auth'
import files from './modules/files'

export default createStore({
	modules: {
		shops,
		products,
		discounts,
		services,
		files,
		categories,
		sketchCategories,
		sketches,
		monuments,
		auth,
	},
})
