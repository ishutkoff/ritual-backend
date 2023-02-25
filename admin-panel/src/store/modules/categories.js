import api from './../../api'

export default {
	state() {
		return {
			categoriesList: [],
		}
	},
	actions: {
		async fetchAllCategories({ commit },shopId) {
			const res = await api.get(`${import.meta.env.VITE_URL}/categories/?shop_id=${shopId}`)
			const result = await res.data
			commit('addAllCategory', result)
		},
		async updateCategory({ commit }, category) {
			const res = await api[category._id ? 'put' : 'post'](
				`${import.meta.env.VITE_URL}/categories/`,
				category,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const result = await res.data

			if (!category._id) commit('addCategory', result)
		},

		async removeCategory({ commit }, categoryId) {
			const res = await api.delete(
				`${import.meta.env.VITE_URL}/categories/${categoryId}`
			)
			await res.data
			commit('removeCategory', categoryId)
		},
	},
	mutations: {
		addAllCategory(state, categories) {
			state.categoriesList = categories
		},
		addCategory(state, category) {
			state.categoriesList.push(category)
		},
		removeCategory(state, categoryId) {
			state.categoriesList = state.categoriesList.filter(
				category => category._id !== categoryId
			)
		},
	},
}
