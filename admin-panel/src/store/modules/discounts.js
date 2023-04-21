import api from '../../api'

export default {
	state() {
		return {
			shopDiscountList: [],
		}
	},
	actions: {
		async fetchOneDiscount({ commit }, payload) {
			const res = await api.get(
				`${import.meta.env.VITE_URL}/discounts/${payload.discountId}`
			)
			const result = await res.data
			commit('getOneDiscount', { newDiscount: result, new: payload.new })
		},

		async updateDiscount({ commit }, discount) {
			const res = await api[discount._id ? 'put' : 'post'](
				`${import.meta.env.VITE_URL}/discounts/`,
				discount,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			return await res.data
		},

		async removeDiscount({ commit }, discountId) {
			const res = await api.delete(
				`${import.meta.env.VITE_URL}/discounts/${discountId}`
			)
			const result = await res.data
			commit('removeDiscount', discountId)
		},
	},
	mutations: {
		setShopDiscounts(state, discounts) {
			console.log(discounts)

			state.shopDiscountList = discounts
		},
		clearDiscountShopList(state) {
			state.shopDiscountList = []
		},
		getOneDiscount(state, data) {
			const newList = state.shopDiscountList.map(discount => {
				if (discount._id === data.newDiscount._id) {
					return data.newDiscount
				}
				return discount
			})
			state.shopDiscountList = newList
			if (data.new) state.shopDiscountList.push(data.newDiscount)
		},
		removeDiscount(state, discountId) {
			state.shopDiscountList = state.shopDiscountList.filter(
				discount => discount._id !== discountId
			)
		},
	},
	getters: {
		getShopDiscounts(state) {
			return state.shopDiscountList
		},
	},
}
