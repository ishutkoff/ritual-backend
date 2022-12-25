import api from './../../api'
export default {
	state() {
		return {
			isLoggedIn: false,
		}
	},
	actions: {
		async loginUser({ commit }, payload) {
			const res = await api.post(
				`${import.meta.env.VITE_URL}/auth/login`,
				{
					login: payload.login,
					password: payload.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			const token = await res.data.token
			if (token) commit('SetLoginMode', true)
			return token
		},
	},
	mutations: {
		SetLoginMode(state, mode) {
			state.isLoggedIn = mode
		},
	},
	getters: {
		isLoggedIn(state) {
			return state.isLoggedIn
		},
	},
}
