<template>
	<div class="shop-edit-form">
		<input v-model="newShop.name" type="text" placeholder="Название магазина" />
		<input v-model="newShop.domain" type="text" placeholder="Домен" />
		<input v-model="newShop.phone" type="text" placeholder="Номер телефона" />
		<input v-model="newShop.email" type="text" placeholder="Email" />
		<input v-model="newShop.telegramApiKey" type="text" placeholder="Telegram Bot Api Key" />
		<input v-model="newShop.chatId" type="text" placeholder="Telegram chat id" />
		<input v-model="newShop.mainColor" type="text" placeholder="Основной цвет" />
	</div>
	<div class="shop-edit-form__options">
		<div class="shop-edit-form__select-widgets">
			<div> <label><input v-model="newShop.useCalc" type='checkbox' /> Показывать калькулятор</label></div>
			<div><label><input v-model="newShop.useVisual" type='checkbox' /> Показывать конструктор</label></div>
			<div><label><input v-model="newShop.useDiscount" type='checkbox' /> Показывать выбор скидки</label></div>
			<div><label><input v-model="newShop.useTeaser" type='checkbox' /> Использовать тизеры</label></div>
		</div>
	</div>
	<div class="shop-edit-form__footer">
		<simple-button :disabled="isEmpty" @click="sendEditForm()">Сохранить</simple-button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	props: {
		shop: {
			type: Object,
		},
	},
	data() {
		return {
			newShop: {
				useCalc: true,
				useVisual: true,
				useDiscount: true,
				useTeaser: true,
			},
			color: null
		}
	},
	methods: {
		...mapActions(['updateShop']),
		async sendEditForm() {
			await this.updateShop(this.newShop)
			this.$router.push(`/`)
		},
	},
	computed: {
		...mapGetters(['getOneShop']),
		isEmpty() {
			return (
				!this.newShop.name ||
				!this.newShop.domain ||
				!this.newShop.chatId ||
				!this.newShop.telegramApiKey
			)
		},
	},
	mounted() {
		if (this.$route.params.id !== 'null') {
			this.newShop = Object.assign({}, this.getOneShop(this.$route.params.id))
		}

	},
}
</script>

<style lang="scss" scoped>
.shop-edit-form {
	// display: flex;
	flex-direction: column;
	margin-top: 20px;
	margin-bottom: 40px;
	columns: 2;

	&__options {
		display: flex;
	}

	&__select-widgets {
		margin-right: 20px;
	}

	input[type='text'],
	input[type='number'] {
		width: 100%;
		height: 40px;
		margin-bottom: 20px;
		padding: 5px 10px;
		border-radius: 5px;
		border: 1px solid;
	}

	select {
		width: 100%;
		height: 40px;
		border: 1px solid;
		border-radius: 5px;
		padding: 5px 10px;
	}

	&__type {
		margin-top: 20px;

		label {
			margin-right: 10px;
		}

		input[type='checkbox'] {
			margin-right: 5x;
		}
	}

	&__footer {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
