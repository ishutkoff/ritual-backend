<template>
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
      <simple-button
          v-if="$route.name === 'shop-products'"
          @click="addNewProduct()"
      >Добавить товар</simple-button
      >
      <br>
      <h2>Категории продукции</h2>
      <categories-list
          :categories="getCategories(false)"
          :forServices="false"
          :shopId="$route.params.id"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import ProductItem from "./ProductItem.vue";
import ProductEditForm from "./ProductEditForm.vue";
import CategoriesList from "./CategoriesList.vue";
import SimpleModal from "./UI/SimpleModal.vue";
import SimpleButton from "./UI/SimpleButton.vue";
export default {
  name: "ProductList",
  components: {SimpleButton, SimpleModal, CategoriesList, ProductEditForm, ProductItem},
  data() {
    return {
      showAddProductDialog: false,
      productModalTitle: '',
    }
  },
  computed: {
    ...mapGetters(['getShopProducts']),
  },
  methods: {
      ...mapMutations(['insertProduct']),
    ...mapActions([
      'updateProduct',
      'insertProduct',
      'fetchOneProduct',
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
    editProduct(product) {
      this.product = product
      this.productModalTitle = 'Редактирование товара'
      this.showAddProductDialog = true
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
  }
}
</script>

<style scoped>

</style>
