<template>
  <div class="single-shop__discount">
    <div class="single-shop__left">
      <simple-button class='discount-add-button' v-if="$route.name === 'shop-discounts'"
        @click="addNewDiscount()">Добавить скидку</simple-button>
      <br>
      <p v-if="$store.state.discounts.shopDiscountList.length === 0" class="empty-list">
        Список скидок пуст
      </p>
      <div class="single-shop__items-wrapper">
        <discount-item v-for="discount in getShopDiscounts" @discount-click="editDiscount(discount)" :discount="discount"
          :key="discount._id" />
      </div>
      <simple-modal :title="discountModalTitle" v-model:show="showAddDiscountDialog" @closeModal="showAddDiscountDialog">
        <template v-slot:body>
          <discount-edit-form @send-form="sendDiscountEditForm" :discount="discount" :shopId="$route.params.id" />
        </template>
      </simple-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DiscountItem from "./DiscountItem.vue";
import DiscountEditForm from "./DiscountEditForm.vue";
import SimpleModal from "./UI/SimpleModal.vue";
import SimpleButton from "./UI/SimpleButton.vue";
export default {
  name: "DiscountList",
  components: { SimpleButton, SimpleModal, DiscountEditForm, DiscountItem },
  data() {
    return {
      showAddDiscountDialog: false,
      discountModalTitle: '',
    }
  },
  computed: {
    ...mapGetters(['getShopDiscounts']),
  },
  methods: {
    ...mapMutations(['insertDiscount']),
    ...mapActions([
      'updateDiscount',
      'insertDiscount',
      'fetchOneDiscount',
    ]),
    addNewDiscount() {
      this.discount = {}
      this.discountModalTitle = 'Добавление скидки'
      this.showAddDiscountDialog = true
    },
    editDiscount(discount) {
      this.discount = discount
      this.discountModalTitle = 'Редактирование скидки'
      this.showAddDiscountDialog = true
    },
    async sendDiscountEditForm(discount) {
      const updatedDiscount = await this.updateDiscount(discount)
      if (!discount._id) {
        await this.insertDiscount({
          shopId: this.$route.params.id,
          discountId: updatedDiscount._id,
        })
        console.log({
          shopId: this.$route.params.id,
          discountId: updatedDiscount._id,
        });

        await this.fetchOneDiscount({ discountId: updatedDiscount._id, new: true })
      } else {
        await this.fetchOneDiscount({ discountId: discount._id, new: false })
      }
      this.showAddDiscountDialog = false
    },
  }
}
</script>

<style scoped>
.discount-add-button {
  max-width: 200px;
}
</style>
