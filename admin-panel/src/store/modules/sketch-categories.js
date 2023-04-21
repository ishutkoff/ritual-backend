import api from './../../api'

export default {
	state() {
		return {
			sketchCategoriesList: [],
		}
	},
	actions: {
		async fetchAllSketchCategories({ commit },shopId) {
			const res = await api.get(`${import.meta.env.VITE_URL}/sketch-categories/?shop_id=${shopId}`)
			const result = await res.data
			commit('addAllSketchCategory', result)
		},
		async updateSketchCategory({ commit }, category) {
			const res = await api[category._id ? 'put' : 'post'](
				`${import.meta.env.VITE_URL}/sketch-categories/`,
				category,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const result = await res.data
			if (!category._id) commit('addSketchCategory', result)
		},

		async removeSketchCategory({ commit }, categoryId) {
			const res = await api.delete(
				`${import.meta.env.VITE_URL}/sketch-categories/${categoryId}`
			)
			await res.data
			commit('removeSketchCategory', categoryId)
		},
	},
	mutations: {
		addAllSketchCategory(state, categories) {
			state.sketchCategoriesList = categories
		},
		addSketchCategory(state, category) {
			state.sketchCategoriesList.push(category)
		},
		removeSketchCategory(state, categoryId) {
			state.sketchCategoriesList = state.sketchCategoriesList.filter(
				category => category._id !== categoryId
			)
		},
	},
}
