<template>
	<div v-for="cat of getCategories" class="category-item" :key="cat._id">
		<input
			type="text"
			v-model="cat.title"
			@keyup.enter="editCategory(cat)"
			@blur="editCategory(cat)"
		/>
		<div @click="deleteCategory(cat._id)" class="category-item__remove-btn">
			&times;
		</div>
	</div>
	<div class="category-item">
		<input
			type="text"
			v-model="newCategory.title"
			placeholder="Новая категория"
			@keyup.enter="addNewCategory"
			@blur="addNewCategory"
		/>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: {
		forServices: {
			type: Boolean,
		},
		shopId: {
			type: String,
		},
	},
	data() {
		return {
			categoriesList: [],
			newCategory: {
				title: '',
				shopId: this.shopId,
				forServices: this.forServices,
			},
		}
	},
	computed: {
		getCategories() {
			return this.forServices
				? this.$store.state.categories.categoriesList.filter(
						category => category.forServices && category.shopId === this.shopId
				  )
				: this.$store.state.categories.categoriesList.filter(
						category => !category.forServices && category.shopId === this.shopId
				  )
		},
	},
	methods: {
		...mapActions(['updateCategory', 'removeCategory']),
		addNewCategory() {
			if (this.newCategory.title !== '') {
				this.updateCategory(this.newCategory)
				this.newCategory = {
					title: '',
					shopId: this.shopId,
					forServices: this.forServices,
				}
			}
		},
		editCategory(category) {
			this.updateCategory(category)
		},
		deleteCategory(categoryId) {
			if (confirm('Вы действительно хотите удалить категорию?')) {
				this.removeCategory(categoryId)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.category-item {
	display: flex;
	align-items: center;

	input[type='text'] {
		padding: 10px 10px;
		background: #242424;
		border-bottom: 1px solid #3e3e3e;
		border-top: 0;
		border-right: 0;
		border-left: 0;
		color: #fff;
		font-size: 16px;
	}

	&__remove-btn {
		cursor: pointer;
		color: red;
		font-size: 21px;
	}
}
</style>
