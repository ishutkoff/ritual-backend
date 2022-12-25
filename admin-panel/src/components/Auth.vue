<template>
	<div class="auth-form">
		<div class="auth-form__wrapper">
			<input v-model="login" type="text" placeholder="Логин" />
			<input v-model="password" type="password" placeholder="Пароль" />
		</div>
		<simple-button @click="goLogin()">Войти</simple-button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data() {
		return {
			login: 'admin',
			password: 'sxs8we8x9h',
		}
	},
	methods: {
		...mapActions(['loginUser']),
		async goLogin() {
			const token = await this.loginUser({
				login: this.login,
				password: this.password,
			})
			localStorage.jwt = token
			this.$router.push({ name: 'shop-list' })
		},
	},
}
</script>

<style lang="scss" scoped>
.auth-form {
	max-width: 300px;
	flex: none;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
	padding: 20px;
	background: #201f1f;
	border-radius: 10px;

	&__wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	input[type='text'],
	input[type='password'] {
		width: 100%;
		height: 40px;
		margin-bottom: 20px;
		padding: 5px 10px;
		border-radius: 5px;
		border: 1px solid;
	}
}
</style>
