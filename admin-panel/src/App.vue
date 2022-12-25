<template>
	<div
		class="app-wrapper"
		:class="!$store.getters.isLoggedIn ? 'no-login' : ''"
	>
		<top-navigation v-if="$store.getters.isLoggedIn" />
		<router-view> </router-view>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
	methods: {
		...mapActions(['fetchShops']),
		...mapMutations(['SetLoginMode']),
	},
	async mounted() {
		await this.fetchShops()
		if (localStorage.jwt) {
			this.SetLoginMode(true)
		}
	},
}
</script>

<style lang="scss" scoped>
.app-wrapper {
	&.no-login {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(100vh - 40px);
		width: 100%;
	}
}
</style>
