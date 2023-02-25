<template>
<div class="b-visualizator">
  <div class="b-visualizator__left">
    <h2>Эскизы</h2>
    <SketchesCategoriesList :shopId="$route.params.id" />
  </div>
  <div class="b-visualizator__right">
    <h2>Памятники</h2>
    <div class="b-visualizator__monuments-list">
      <MonumentsList/>
    </div>
  </div>
</div>
</template>

<script>
import SketchesCategoriesList from "./SketchesCategoriesList.vue";
import SimpleButton from "./UI/SimpleButton.vue";
import MonumentsList from "./MonumentsList.vue";

export default {
  name: "Visualizator",
  components: {MonumentsList, SimpleButton, SketchesCategoriesList}
}
</script>

<style lang="scss" scoped>
.b-visualizator {
  display: flex;

  h2{
    margin-bottom: 50px;
  }
  &__left{
    width: 70%;
    padding: 10px;
    border-right: 1px solid #3c3b3b;
    padding-right: 20px;
    margin-right: 20px;
   }
  &__right{
    width: 30%;
    padding: 10px;
  }

  &__monuments-list{
    border: 1px solid #3c3b3b;
    margin-bottom: 40px;
    background: #2a2a2a;
    border-radius: 10px;
    padding: 30px 20px;
  }
}
</style>
