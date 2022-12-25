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

		async uploadPicture({ commit }, formData) {
			const res = await api.post(
				`${import.meta.env.VITE_URL}/files/`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)

			const result = await res.data
			return result.data.filename
		},

		async removePicture({ commit }, fileName) {
			const res = await api.post(
				`${import.meta.env.VITE_URL}/files/remove/`,
				{
					imageName: fileName,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			await res.data
		},
		async getPicture({ commit }, fileName) {
			const res = await api.get(
				`${import.meta.env.VITE_URL}/products/files/${fileName}`
			)
			const result = await res.data
			return result
		},
	},
	mutations: {
		addProductToShopList(state, product) {
			state.shopProductList.push(product)
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
