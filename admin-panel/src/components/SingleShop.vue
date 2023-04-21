<template>
	<div class="single-shop">
		<div class="single-shop__title">
			{{ getOneShop($route.params.id).name }}
			<p class="single-shop__subtitle">#{{ $route.params.id }}</p>
		</div>
		<div class="tabs-navigation">
			<div class="tabs-navigation__left">
				<router-link :to="`/shop/${$route.params.id}/products`" class="tabs-navigation__item" :class="
					$route.name === 'shop-products'
						? 'tabs-navigation__item--selected'
						: ''
				">
					Товары
				</router-link>
				<router-link :to="`/shop/${$route.params.id}/services`" class="tabs-navigation__item" :class="
					$route.name === 'shop-services'
						? 'tabs-navigation__item--selected'
						: ''
				">
					Услуги
				</router-link>
				<router-link :to="`/shop/${$route.params.id}/visualizator`" class="tabs-navigation__item" :class="
					$route.name === 'shop-visualizator'
						? 'tabs-navigation__item--selected'
						: ''
				">
					Визуализатор
				</router-link>
				<router-link :to="`/shop/${$route.params.id}/discounts`" class="tabs-navigation__item" :class="
					$route.name === 'shop-discounts'
						? 'tabs-navigation__item--selected'
						: ''
				">
					Скидки
				</router-link>
			</div>
		</div>

		<div v-if="$route.name === 'shop-products'" class="tabs-item">
			<ProductList />
		</div>

		<div v-if="$route.name === 'shop-services'" class="tabs-item">
			<ServicesList />
		</div>

		<div v-if="$route.name === 'shop-visualizator'" class="tabs-item">
			<Visualizator />
		</div>

		<div v-if="$route.name === 'shop-discounts'" class="tabs-item">
			<DiscountList />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ProductItem from './ProductItem.vue'
import ServiceItem from './ServiceItem.vue'
import ProductEditForm from './ProductEditForm.vue'
import ServiceEditForm from './ServiceEditForm.vue'
import CategoriesList from './CategoriesList.vue'
import ProductList from "./ProductList.vue";
import SimpleButton from "./UI/SimpleButton.vue";
import Visualizator from "./Visualizator.vue";
import ServicesList from "./ServicesList.vue";
import DiscountList from './DiscountList.vue'
export default {
	components: {
		ServicesList,
		Visualizator,
		SimpleButton,
		ProductList,
		DiscountList
	},
	data() {
		return {
			showAddProductDialog: false,
			showAddServiceDialog: false,
			productModalTitle: '',
			serviceModalTitle: '',
		}
	},
	computed: {
		...mapGetters(['getOneShop', 'getShopServices', 'getShopProducts']),
	},
	methods: {
		...mapMutations(['clearProductShopList', 'clearShopSketchList', 'setShopMonuments', 'clearShopMonumentList', 'clearServicesShopList', 'setShopProducts', 'setShopDiscounts', 'setShopServices', 'setShopSketches']),
		...mapActions([
			'fetchAllCategories',
			'fetchAllSketchCategories',
			'fetchShopById'
		]),
		getCategories(forServices) {
			return forServices
				? this.$store.state.categories.categoriesList.filter(
					category => category.forServices
				)
				: this.$store.state.categories.categoriesList.filter(
					category => !category.forServices
				)
		},
		addNewService() {
			this.service = {}
			this.serviceModalTitle = 'Добавление услуги'
			this.showAddServiceDialog = true
		},

		editService(service) {
			this.service = service
			this.serviceModalTitle = 'Редактирование услуги'
			this.showAddServiceDialog = true
		},

		async sendServiceEditForm(service) {
			const updatedService = await this.updateService(service)
			if (!service._id) {
				await this.insertService({
					shopId: this.$route.params.id,
					serviceId: updatedService._id,
				})
				await this.fetchOneService({ serviceId: updatedService._id, new: true })
			} else {
				await this.fetchOneService({ serviceId: service._id, new: false })
			}
			this.showAddServiceDialog = false
		},
	},
	async mounted() {
		this.shop = await this.fetchShopById(this.$route.params.id)
		console.log(this.shop)
		this.clearProductShopList()
		this.clearServicesShopList()
		this.clearShopSketchList()
		this.clearShopMonumentList()
		this.setShopProducts(this.shop.products)
		this.setShopDiscounts(this.shop.discounts)
		this.setShopServices(this.shop.services)
		this.setShopSketches(this.shop.sketches)
		this.setShopMonuments(this.shop.monuments)
		await this.fetchAllCategories(this.$route.params.id)
		await this.fetchAllSketchCategories(this.$route.params.id)
	},
}
</script>

<style lang="scss">
.single-shop {
	&__title {
		font-size: 30px;
		margin-bottom: 40px;

		p {
			font-size: 18px;
			margin-top: 10px;
		}
	}

	&__left {
		width: 80%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
	}

	&__right {
		width: calc(20% - 20px);
		margin-left: 20px;
		padding-left: 20px;
		border-left: 1px solid #1a1a1a;

		h2 {
			font-size: 17px;
			margin-bottom: 20px;
			color: #646cff;
		}
	}

	&__products {
		margin-bottom: 40px;
		display: flex;
		flex-wrap: wrap;
	}

	&__services {
		margin-bottom: 40px;
		display: flex;
		flex-wrap: wrap;
	}

	&__buttons {
		display: flex;
		gap: 20px;
	}

	&__items {
		&-list {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;

			h2 {
				margin-bottom: 20px;
				// margin-top: 40px;
			}
		}

		&-wrapper {
			display: flex;
			flex-wrap: wrap;
		}
	}
}

.tabs-navigation {
	display: flex;
	justify-content: space-between;
	position: sticky;
	top: 40px;
	z-index: 5;
	background: #242424;
	padding-top: 10px;
	align-items: center;
	border-bottom: 2px solid #1a1a1a;
	margin-bottom: 40px;

	&__left {
		display: flex;
	}

	&__item {
		padding: 14px 41px;
		cursor: pointer;
		background-color: #1a1a1a;
		border-radius: 10px 10px 0 0;
		margin-right: 2px;
		border-radius: 10px 10px 0 0;

		&--selected {
			background: #0e0e0e;
		}

		&:last-child {
			margin: 0;
		}
	}
}

.empty-list {
	color: #7c7c7c;
	font-size: 18px;
}
</style>
