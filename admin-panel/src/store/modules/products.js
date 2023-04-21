import api from './../../api'

export default {
	state() {
		return {
			shopProductList: [],
		}
	},
	actions: {
		async fetchOneProduct({ commit }, payload) {
			const res = await api.get(
				`${import.meta.env.VITE_URL}/products/${payload.productId}`
			)
			const result = await res.data
			commit('getOneProduct', { newProduct: result, new: payload.new })
		},

		async updateProduct({ commit }, product) {
			const res = await api[product._id ? 'put' : 'post'](
				`${import.meta.env.VITE_URL}/products/`,
				product,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			return await res.data
		},

		async removeProduct({ commit }, productId) {
			const res = await api.delete(
				`${import.meta.env.VITE_URL}/products/${productId}`
			)
			const result = await res.data
			commit('removeProduct', productId)
		},
	},
	mutations: {
		setShopProducts(state, products){
			state.shopProductList = products
		},
		clearProductShopList(state) {
			state.shopProductList = []
		},
		getOneProduct(state, data) {
			const newList = state.shopProductList.map(product => {
				if (product._id === data.newProduct._id) {
					return data.newProduct
				}
				return product
			})
			state.shopProductList = newList
			if (data.new) state.shopProductList.push(data.newProduct)
		},
		removeProduct(state, productId) {
			state.shopProductList = state.shopProductList.filter(
				product => product._id !== productId
			)
		},
	},
	getters: {
		getShopProducts: state => category => {
			return category
				? state.shopProductList.filter(product => product.category === category)
				: state.shopProductList.filter(product => !product.category)
		},
	},
}
