<template>
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
      <simple-button
          v-if="$route.name === 'shop-services'"
          @click="addNewService()"
      >Добавить услугу</simple-button
      >
      <br>
      <h2>Категории услуг</h2>
      <categories-list
          :categories="getCategories(true)"
          :forServices="true"
          :shopId="$route.params.id"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import SimpleModal from "./UI/SimpleModal.vue";
import CategoriesList from "./CategoriesList.vue";
import ServiceEditForm from "./ServiceEditForm.vue";
import ServiceItem from "./ServiceItem.vue";


export default {
  name: "ServicesList",
  components: {SimpleModal, CategoriesList, ServiceEditForm, ServiceItem},
  data() {
    return {
      showAddProductDialog: false,
      showAddServiceDialog: false,
      productModalTitle: '',
      serviceModalTitle: '',
    }
  },
  computed: {
    ...mapGetters(['getShopServices']),
  },
  methods: {
    ...mapMutations(['setShopServices']),
    ...mapActions([
      'updateService',
      'fetchOneService',
      'insertService',
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
}
</script>

<style scoped>

</style>
