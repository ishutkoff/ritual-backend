import api from './../../api'
export default {
	state() {
		return {
			shopServicesList: [],
		}
	},
	actions: {
		async fetchOneService({ commit }, payload) {
			const res = await api.get(
				`${import.meta.env.VITE_URL}/services/${payload.serviceId}`
			)
			const result = await res.data
			commit('getOneService', { newService: result, new: payload.new })
		},

		async updateService({ commit }, service) {
			const res = await api[service._id ? 'put' : 'post'](
				`${import.meta.env.VITE_URL}/services/`,
				service,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			return await res.data
		},

		async removeService({ commit }, serviceId) {
			const res = await api.delete(
				`${import.meta.env.VITE_URL}/services/${serviceId}`
			)
			await res.data
			commit('removeService', serviceId)
		},
	},
	mutations: {
		addServiceToShopList(state, service) {
			state.shopServiceList.push(service)
		},
		clearServicesShopList(state) {
			state.shopServicesList = []
		},
		setShopServices(state, service){
			state.shopServicesList = service
		},
		getOneService(state, data) {
			const newList = state.shopServicesList.map(service => {
				if (service._id === data.newService._id) {
					return data.newService
				}
				return service
			})
			state.shopServicesList = newList
			if (data.new) state.shopServicesList.push(data.newService)
		},
		removeService(state, serviceId) {
			state.shopServicesList = state.shopServicesList.filter(
				service => service._id !== serviceId
			)
		},
	},
	getters: {
		getShopServices: state => category => {
			return category
				? state.shopServicesList.filter(
						service => service.category === category
				  )
				: state.shopServicesList.filter(service => !service.category)
		},
	},
}
