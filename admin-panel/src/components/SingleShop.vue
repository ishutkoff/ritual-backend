<template>
	<div class="single-shop">
		<div class="single-shop__title">
			{{ getOneShop($route.params.id).name }}
			<p class="single-shop__subtitle">#{{ $route.params.id }}</p>
		</div>
		<div class="tabs-navigation">
			<div class="tabs-navigation__left">
				<router-link
					:to="`/shop/${$route.params.id}/products`"
					class="tabs-navigation__item"
					:class="
						$route.name === 'shop-products'
							? 'tabs-navigation__item--selected'
							: ''
					"
				>
					Товары
				</router-link>
				<router-link
					:to="`/shop/${$route.params.id}/services`"
					class="tabs-navigation__item"
					:class="
						$route.name === 'shop-services'
							? 'tabs-navigation__item--selected'
							: ''
					"
				>
					Услуги
				</router-link>
			</div>
			<div class="single-shop__buttons">
				<simple-button
					v-if="$route.name === 'shop-products'"
					@click="addNewProduct()"
					>Добавить товар</simple-button
				>
				<simple-button
					v-if="$route.name === 'shop-services'"
					@click="addNewService()"
					>Добавить услугу</simple-button
				>
			</div>
		</div>
		<div v-if="$route.name === 'shop-products'" class="tabs-item">
			<div class="single-shop__products">
				<div class="single-shop__left">
					<p
						v-if="$store.state.products.shopProductList.length === 0"
						class="empty-list"
					>
						Список товаров пуст
					</p>

					<div v-for="category of getCategories(false)" :key="category._id">
						<div
							v-if="getShopProducts(category._id).length > 0"
							class="single-shop__items-list"
						>
							<h2>{{ category.title }}</h2>
							<div class="single-shop__items-wrapper">
								<product-item
									v-for="product in getShopProducts(category._id)"
									@product-click="editProduct(product)"
									:product="product"
									:key="product._id"
								/>
							</div>
						</div>
					</div>

					<div
						v-if="getShopProducts(false).length > 0"
						class="single-shop__items-list"
					>
						<h2>Без категории</h2>
						<div class="single-shop__items-wrapper">
							<product-item
								v-for="product in getShopProducts(false)"
								@product-click="editProduct(product)"
								:product="product"
								:key="product._id"
							/>
						</div>
					</div>
					<simple-modal
						:title="productModalTitle"
						v-model:show="showAddProductDialog"
						@closeModal="showAddProductDialog"
					>
						<template v-slot:body>
							<product-edit-form
								@send-form="sendProductEditForm"
								:product="product"
								:shopId="$route.params.id"
							/>
						</template>
					</simple-modal>
				</div>
				<div class="single-shop__right">
					<h2>Категории продукции</h2>
					<categories-list
						:categories="getCategories(false)"
						:forServices="false"
						:shopId="$route.params.id"
					/>
				</div>
			</div>
		</div>
		<div v-if="$route.name === 'shop-services'" class="tabs-item">
			<div class="single-shop__services">
				<div class="single-shop__left">
					<p
						v-if="$store.state.services.shopServicesList.length === 0"
						class="empty-list"
					>
						Список услуг пуст
					</p>
					<div v-for="category of getCategories(true)" :key="category._id">
						<div
							v-if="getShopServices(category._id).length > 0"
							class="single-shop__items-list"
						>
							<h2>{{ category.title }}</h2>
							<div class="single-shop__items-wrapper">
								<service-item
									v-for="service in getShopServices(category._id)"
									@service-click="editService(service)"
									:service="service"
									:key="service._id"
								/>
							</div>
						</div>
					</div>

					<div
						v-if="getShopServices(false).length > 0"
						class="single-shop__items-list"
					>
						<h2>Без категории</h2>
						<div class="single-shop__items-wrapper">
							<service-item
								v-for="service in getShopServices(false)"
								@service-click="editService(service)"
								:service="service"
								:key="service._id"
							/>
						</div>
					</div>
					<simple-modal
						:title="serviceModalTitle"
						v-model:show="showAddServiceDialog"
						@closeModal="showAddServiceDialog"
					>
						<template v-slot:body>
							<service-edit-form
								@send-form="sendServiceEditForm"
								:service="service"
								:shopId="$route.params.id"
							/>
						</template>
					</simple-modal>
				</div>
				<div class="single-shop__right">
					<h2>Категории услуг</h2>
					<categories-list
						:categories="getCategories(true)"
						:forServices="true"
						:shopId="$route.params.id"
					/>
				</div>
			</div>
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
export default {
	components: {
		ProductItem,
		ServiceItem,
		ProductEditForm,
		ServiceEditForm,
		CategoriesList,
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
		...mapMutations(['clearProductShopList', 'clearServicesShopList']),
		...mapActions([
			'fetchAllCategories',
			'updateProduct',
			'insertProduct',
			'fetchOneProduct',
			'updateService',
			'insertService',
			'fetchOneService',
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
		addNewProduct() {
			this.product = {}
			this.productModalTitle = 'Добавление товара'
			this.showAddProductDialog = true
		},
		addNewService() {
			this.service = {}
			this.serviceModalTitle = 'Добавление услуги'
			this.showAddServiceDialog = true
		},
		editProduct(product) {
			this.product = product
			this.productModalTitle = 'Редактирование товара'
			this.showAddProductDialog = true
		},
		editService(service) {
			this.service = service
			this.serviceModalTitle = 'Редактирование услуги'
			this.showAddServiceDialog = true
		},
		async sendProductEditForm(product) {
			const updatedProduct = await this.updateProduct(product)
			if (!product._id) {
				await this.insertProduct({
					shopId: this.$route.params.id,
					productId: updatedProduct._id,
				})
				await this.fetchOneProduct({ productId: updatedProduct._id, new: true })
			} else {
				await this.fetchOneProduct({ productId: product._id, new: false })
			}
			this.showAddProductDialog = false
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
		this.clearProductShopList()
		this.clearServicesShopList()
		for (const product of this.getOneShop(this.$route.params.id).products) {
			await this.fetchOneProduct({ productId: product, new: true })
		}
		for (const service of this.getOneShop(this.$route.params.id).services) {
			await this.fetchOneService({ serviceId: service, new: true })
		}
		await this.fetchAllCategories(this.$route.params.id)
	},
}
</script>

<style lang="scss" scoped>
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

		border-radius: 10px 10px 0 0;

		&--selected {
			background: #0e0e0e;
		}
		&:first-child {
			margin-right: 2px;
		}
	}
}
.empty-list {
	font-size: 18px;
	text-align: center;
	background: #1e1e1e;
	padding: 20px;
	border-radius: 10px;
}
</style>
