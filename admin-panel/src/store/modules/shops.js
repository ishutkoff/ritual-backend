import api from './../../api'

export default {
	state() {
		return {
			shopsList: [],
		}
	},
	actions: {
		async fetchShops({ commit }) {
			const res = await api.get(`${import.meta.env.VITE_URL}/shops/`)
			const shops = await res.data
			commit('updateShops', shops)
		},
		async fetchShopById({ commit }, shopId) {
			const res = await api.get(`${import.meta.env.VITE_URL}/shops/${shopId}`)
			const shop = await res.data
			commit('updateOneShop', shop)
			return shop
		},

		async insertProduct({ commit }, payload) {
			const res = await api.put(
				`${import.meta.env.VITE_URL}/shops/insert-product/${payload.shopId}`,
				[payload.productId],
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const shop = await res.data
			commit('updateOneShop', shop)
		},

		async insertService({ commit }, payload) {
			const res = await api.put(
				`${import.meta.env.VITE_URL}/shops/insert-service/${payload.shopId}`,
				[payload.serviceId],
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const shop = await res.data
			commit('updateOneShop', shop)
		},

		async insertSketch({ commit }, payload) {
			const res = await api.put(
				`${import.meta.env.VITE_URL}/shops/insert-sketch/${payload.shopId}`,
				[payload.sketchId],
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const shop = await res.data
			console.log(shop)
			commit('updateOneShop', shop)
		},

		async insertMonument({ commit }, payload) {
			const res = await api.put(
				`${import.meta.env.VITE_URL}/shops/insert-monument/${payload.shopId}`,
				[payload.monumentId],
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const shop = await res.data
			commit('updateOneShop', shop)
		},

		async updateShop({ commit }, newShop) {
			const res = await api[newShop._id ? 'put' : 'post'](
				`${import.meta.env.VITE_URL}/shops/`,
				newShop,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const shop = await res.data
			if (newShop._id) commit('updateOneShop', shop)
			else commit('addShop', shop)
		},

		async removeShop({ commit }, shopId) {
			const res = await api.delete(
				`${import.meta.env.VITE_URL}/shops/${shopId}`
			)
			await res.data
			commit('removeShop', shopId)
		},
	},
	mutations: {
		updateShops(state, shops) {
			state.shopsList = shops
		},

		updateOneShop(state, newShop) {
			const newList = state.shopsList.map(shop => {
				if (shop._id === newShop._id) {
					return newShop
				}
				return shop
			})
			state.shopsList = newList
		},
		addShop(state, shop) {
			state.shopsList.push(shop)
		},
		removeShop(state, shopId) {
			state.shopsList = state.shopsList.filter(shop => shop._id !== shopId)
		},
	},

	getters: {
		getAllShops(state) {
			return state.shopsList
		},
		getOneShop: state => id => {
			return state.shopsList.find(shop => shop._id === id)
		},
	},
}
