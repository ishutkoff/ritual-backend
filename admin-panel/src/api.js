import axios from 'axios'
import router from './router/router'
import store from './store'
const api = axios.create()

api.interceptors.request.use(
	config => {
		config.headers = {
			authorization: `Bearer ${localStorage.jwt}`,
		}
		return config
	},
	error => {}
)
api.interceptors.response.use(
	config => {
		config.headers = {
			authorization: `Bearer ${localStorage.jwt}`,
			'Content-Type': 'application/json',
		}
		return config
	},
	error => {
		if (error.response.status === 401) router.push({ name: 'auth' })
	}
)

export default api
