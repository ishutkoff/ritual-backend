import api from './../../api'
export default {
	state() {
		return {
			shopMonumentList: [],
		}
	},
	actions: {
		async addMonument({ commit },monument) {
			const res = await api.post(
				`${import.meta.env.VITE_URL}/monument/`,
				monument,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			commit('addMonument', res.data)
			return await res.data
		},

		async removeMonument({ commit }, monumentId) {
			console.log(monumentId)
			const res = await api.delete(
				`${import.meta.env.VITE_URL}/monument/${monumentId}`
			)
			const result = await res.data
			commit('removeMonument', monumentId)
		},
	},
	mutations: {
		setShopMonuments(state, sketches){
			state.shopMonumentList = sketches
		},
		clearShopMonumentList(state) {
			state.shopMonumentList = []
		},
		addMonument(state, newSketch) {
			state.shopMonumentList.push(newSketch)
		},
		removeMonument(state, monumentId) {
			state.shopMonumentList = state.shopMonumentList.filter(
				monument => monument._id !== monumentId
			)
		},

	},
	getters: {

	},
}
