<template>
	<div class="shop-edit-form">
		<input v-model="newShop.name" type="text" placeholder="Название магазина" />
		<input v-model="newShop.domain" type="text" placeholder="Домен" />
		<input v-model="newShop.phone" type="text" placeholder="Номер телефона" />
		<input v-model="newShop.email" type="text" placeholder="Email" />
		<input
			v-model="newShop.telegramApiKey"
			type="text"
			placeholder="Telegram Bot Api Key"
		/>
		<input
			v-model="newShop.chatId"
			type="text"
			placeholder="Telegram chat id"
		/>
	</div>
	<div class="shop-edit-form__footer">
		<simple-button :disabled="isEmpty" @click="sendEditForm()"
			>Сохранить</simple-button
		>
	</div>
</template>

<script>
export default {
	props: {
		shop: {
			type: Object,
		},
	},
	data() {
		return {
			newShop: {},
		}
	},
	methods: {
		sendEditForm() {
			this.$emit('send-form', this.newShop)
		},
	},
	computed: {
		isEmpty() {
			return !this.newShop.name || !this.newShop.domain || !this.newShop.email
		},
	},
	mounted() {
		this.newShop = Object.assign({}, this.shop)
	},
}
</script>

<style lang="scss" scoped>
.shop-edit-form {
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	margin-bottom: 40px;

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
