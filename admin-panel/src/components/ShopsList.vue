<template>
	<h1>Список сайтов</h1>
	<div class="shops-list">
		<ShopsListItem
			v-for="shop in getAllShops"
			:shop="shop"
			@updateShop="setUpdatedShop"
			:key="shop._id"
		/>
		<div class="shops-list__add-wrapper">
			<div @click="openAddDialog()" class="shops-list__add-button">
				Добавить сайт
			</div>
		</div>
	</div>
	<simple-modal
		:title="modalTitle"
		v-model:show="showAddDialog"
		@closeModal="showAddDialog"
	>
		<template v-slot:body>
			<shop-edit-form @send-form="sendShopEditForm" :shop="shop" />
		</template>
	</simple-modal>
</template>

<script>
import ShopsListItem from './ShopsListItem.vue'
import ShopEditForm from './ShopEditForm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
	components: { ShopsListItem, ShopEditForm },
	data() {
		return {
			showAddDialog: false,
			shop: {},
			modalTitle: '',
		}
	},
	computed: {
		...mapGetters(['getAllShops']),
	},

	methods: {
		...mapActions(['updateShop']),
		openAddDialog() {
			this.shop = {}
			this.setModalTitle('Добавление нового сайта')
			this.showAddDialog = true
		},
		async sendShopEditForm(shop) {
			await this.updateShop(shop)
			this.showAddDialog = false
		},
		setUpdatedShop(shop) {
			this.shop = shop
			this.setModalTitle('Редактирование сайта')
			this.showAddDialog = true
		},
		setModalTitle(text) {
			this.modalTitle = text
		},
	},
}
</script>

<style lang="scss" scoped>
.shops-list {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	margin-bottom: 20px;
	padding-bottom: 20px;

	@media (max-width: 768px) {
		width: 100%;
		flex-wrap: wrap;
	}

	&__add-wrapper {
		display: flex;
		position: relative;
		flex-direction: column;
		color: #3e3e3e;
		background: #1c1b1b;
		border: 1px solid transparent;
		transition: border-color 0.25s;
		border-radius: 10px;
		height: 206px;
		padding: 10px 20px;
		width: calc(50% - 10px);
		margin-bottom: 5px;
		justify-content: center;
		align-items: center;

		&:hover {
			color: #7c7c7c;
		}
	}

	&__add-button {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 10px;
		bottom: 10px;
		left: 10px;
		right: 10px;
		border: 1px dashed #3e3e3e;
		border-radius: 5px;
		cursor: pointer;
		font-size: 20px;
	}
}
</style>
