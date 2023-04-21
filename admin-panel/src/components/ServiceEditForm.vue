<template>
	<div class="service-edit-form">
		<div class="service-edit-form__left">
			<img src="" alt="" />
		</div>
		<div class="service-edit-form__right">
			<input
				v-model="newService.title"
				type="text"
				placeholder="Название услуги"
			/>
			<input
				v-model="newService.price"
				type="number"
				placeholder="Цена услуги (руб.)"
			/>
			<select v-model="currentCategory">
				<option selected value="">Без категории</option>
				<option
					v-for="category of getCategories"
					:key="category._id"
					:value="category._id"
				>
					{{ category.title }}
				</option>
			</select>
			<div class="service-edit-form__type">
				<label>
					<input v-model="newService.burial" type="checkbox" />
					Захоронение
				</label>
				<label>
					<input v-model="newService.cremation" type="checkbox" />
					Кремирование
				</label>
			</div>
		</div>
	</div>
	<div class="service-edit-form__footer">
		<simple-button
			:disabled="isEmpty"
			@click="sendEditForm()"
			class="shops-list__add-button"
			>Сохранить</simple-button
		>
	</div>
</template>

<script>
export default {
	props: {
		service: {
			type: Object,
		},
		shopId: {
			type: String,
		},
	},
	data() {
		return {
			currentCategory: '',
			newService: {},
		}
	},
	methods: {
		sendEditForm() {
			this.newService.category = this.currentCategory
			this.$emit('send-form', this.newService)
		},
	},
	computed: {
		isEmpty() {
			if (!this.newService.title || !this.newService.price === '') return true
			return false
		},
		getCategories() {
			return this.$store.state.categories.categoriesList.filter(
				category => category.forServices && category.shopId === this.shopId
			)
		},
	},
	mounted() {
		this.newService = Object.assign({}, this.service)
		if (this.newService.category) {
			this.currentCategory = this.newService.category
		}
	},
}
</script>

<style lang="scss" scoped>
.service-edit-form {
	display: flex;
	margin-top: 20px;
	margin-bottom: 40px;

	&__left {
		width: 35%;
	}

	&__right {
		width: 65%;
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
