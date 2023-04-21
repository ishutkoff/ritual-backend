<template>
  <div class="monument-wrapper">
    <Loader v-if="loading"/>
    <input class="category-item__hidden-input" name="image" id="addMonumentInput" type="file" multiple @change="fileInputChange()">
    <label for="addMonumentInput">
      <span class="category-item__load-file-btn">Добавить памятник</span>
    </label>
    <div v-if="$store.state.monuments.shopMonumentList.length === 0" class="empty-list">Нет элементов для отображения</div>
    <div class="monuments-list">
      <div class="monuments-list__item" v-for="monument of $store.state.monuments.shopMonumentList" :key="monument._id">
        <div @click="remove(monument._id)" class="monuments-list__remove-btn">&times;</div>
        <img
            :src="`${defaultPath}/files/${monument.image}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
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
      loadProgress: 0,
      loading: false
		}
	},

	methods: {
		...mapActions(['uploadPicture', 'addMonument', 'removeMonument', 'insertMonument']),

    async fileInputChange(){
      this.loading = true
      let files = Array.from(event.target.files)
      for(let file of files){
        let formData = new FormData()
        formData.append('image', file)
        let result  = await this.uploadPicture(formData)

        let newMonument = await this.addMonument({
          title: file.name,
          image: result,
        })
        await this.insertMonument({
          shopId: this.$route.params.id,
          monumentId: newMonument._id,
        })
      }
      this.loading = false
    },
    remove(monumentId) {
      if (confirm('Вы действительно хотите удалить памятник?')) {
        this.removeMonument(monumentId)
      }
    },
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

  &__load-file-btn{
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

  &__hidden-input{
    display: none;
  }


  h2{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: -20px
  }

  &__progress-bar{
    height: 2px;
    background-color: #535bf2;
    margin-top: 20px;
  }

	input[type='text'] {
		padding: 10px 10px;
		background: #242424;
		border: none;
		color: #fff;
		font-size: 16px;
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
.monuments-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 86px;
    height: 120px;
    position: relative;

    img {
      width: auto;
      height: 100%;
      max-width: 100%;
    }

    &:hover {
      .monuments-list__remove-btn {
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
.monument-wrapper{
  position: relative;
}
</style>
