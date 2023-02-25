import api from './../../api'
export default {
	state() {
		return {
			shopSketchList: [],
		}
	},
	actions: {
		async addSketch({ commit },sketch) {
			const res = await api.post(
				`${import.meta.env.VITE_URL}/sketch/`,
				sketch,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			commit('addSketch', res.data)
			return await res.data
		},

		async removeSketch({ commit }, sketchId) {
			const res = await api.delete(
				`${import.meta.env.VITE_URL}/sketch/${sketchId}`
			)
			const result = await res.data
			commit('removeSketch', sketchId)
		},
	},
	mutations: {
		setShopSketches(state, sketches){
			state.shopSketchList = sketches
		},
		clearShopSketchList(state) {
			state.shopSketchList = []
		},
		addSketch(state, newSketch) {
			state.shopSketchList.push(newSketch)
		},
		removeSketch(state, sketchId) {
			state.shopSketchList = state.shopSketchList.filter(
				sketch => sketch._id !== sketchId
			)
		},

	},
	getters: {
		getShopSketches: state => categoryId => {
			return state.shopSketchList.filter(sketch => sketch.categoryId === categoryId)
		},
	},
}
