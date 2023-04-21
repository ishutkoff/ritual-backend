<template>
  <div v-for="cat of getCategories" class="category-item" :key="cat._id">
    <h2>
      <input
          type="text"
          v-model="cat.title"
          style='width:auto'
          @keyup.enter="editCategory(cat)"
          @blur="editCategory(cat)"
      />
      <div @click="deleteCategory(cat._id)" class="category-item__remove-btn">
        &times;
      </div>
    </h2>
    <input class="category-item__hidden-input" name="image" :id="'cat'+cat._id" type="file" multiple
           @change="fileInputChange(cat._id)">
    <label :for="'cat'+cat._id">
      <span class="category-item__load-file-btn">Добавить эскизы</span>
    </label>
    <Loader v-if="loading && loadingCategory===cat._id"/>
    <div v-if="getShopSketches(cat._id).length === 0" class="empty-list">Нет элементов для отображения</div>
     <div  v-if="getShopSketches(cat._id).length > 0">
       <div class="sketches-list">
         <div class="sketches-list__item" v-for="sketch of getShopSketches(cat._id)" :key="sketch._id">
           <div @click="deleteSketch(sketch._id)" class="sketches-list__remove-btn">&times;</div>
           <img
               :src="`${defaultPath}/files/${sketch.image}`"
           />
         </div>
       </div>
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
import {mapActions, mapGetters} from 'vuex'
import SimpleButton from "./UI/SimpleButton.vue";
import Loader from "./Loader.vue";

export default {
  components: {Loader, SimpleButton},
  props: {
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
      loadProgress: 0,
      loading: false,
      loadingCategory: ''
    }
  },
  computed: {
    ...mapGetters(['getShopSketches']),
    getCategories() {
      return this.$store.state.sketchCategories.sketchCategoriesList.filter(
          category => category.shopId === this.shopId
      )
    },
  },
  methods: {
    ...mapActions(['updateSketchCategory', 'removeSketch', 'removeSketchCategory', 'uploadPicture', 'addSketch', 'insertSketch']),
    addNewCategory() {
      if (this.newCategory.title !== '') {
        this.updateSketchCategory(this.newCategory)
        this.newCategory = {
          title: '',
          shopId: this.shopId,
        }
      }
    },
    editCategory(category) {
      this.updateSketchCategory(category)
    },
    deleteSketch(sketchId) {
      if (confirm('Вы действительно хотите удалить эскиз?')) {
        this.removeSketch(sketchId)
      }
    },
    deleteCategory(categoryId) {
      if (confirm('Вы действительно хотите удалить категорию?')) {
        this.removeSketchCategory(categoryId)
      }
    },
    async fileInputChange(categoryId) {
      this.loading = true
      this.loadingCategory = categoryId
      let files = Array.from(event.target.files)
      for (let file of files) {
        let formData = new FormData()
        formData.append('image', file)
        let result = await this.uploadPicture(formData)

        let newSketch = await this.addSketch({
          title: file.name,
          image: result,
          categoryId: categoryId
        })
        await this.insertSketch({
          shopId: this.$route.params.id,
          sketchId: newSketch._id,
        })
      }
      this.loadingCategory = ''
      this.loading = false
    }
  },
  created() {
    this.defaultPath = import.meta.env.VITE_URL
  },
}
</script>

<style lang="scss" scoped>
.category-item {
  border: 1px solid #3c3b3b;
  margin-bottom: 40px;
  border-radius: 10px;
  padding: 30px 20px;
  position: relative;

  &__load-file-btn {
    border-radius: 8px;
    display: inline-flex;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    color: #fff;
    cursor: pointer;
    transition: border-color 0.25s;
    margin-bottom: 40px;

    &:hover {
      border-color: #646cff;
    }
  }

  &__hidden-input {
    display: none;
  }


  h2 {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    //position: absolute;
    top: -20px
  }

  &__progress-bar {
    height: 2px;
    background-color: #535bf2;
    margin-top: 20px;
  }

  input[type='text'] {
    padding: 10px 10px;
    background: #242424;
    border: none;
    color: #fff;
    font-size: 24px;
    margin-bottom: 7px;
  }

  &__remove-btn {
    cursor: pointer;
    color: red;
    font-size: 21px;
    position: absolute;
    top: 24px;
    right: 28px;
  }
}

.sketches-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  &__item {
    width: 80px;
    position: relative;

    img {
      width: 100%;
      height: auto;
    }

    &:hover {
      .sketches-list__remove-btn {
        display: block;
      }
    }
  }

  &__remove-btn {
    display: none;
    cursor: pointer;
    color: red;
    font-size: 21px;
    position: absolute;
    top: -5px;
    right: 3px;
  }
}
</style>
