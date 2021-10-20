<template>
  <b-container class="d-flex justify-content-center p-5">
    <b-card class="fruitCard" title="Frutas">
      <b-list-group flush>
        <b-list-group-item class="w-100" v-for="f in fruits" :key="f.id"><FruitItem :fruit="f"/></b-list-group-item>
        <b-list-group-item class="w-100 d-flex justify-content-center"><b-btn >+</b-btn></b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import { Vue,Component } from "vue-property-decorator";
import Api from "@/plugins/api/api";
import FruitItem from "@/components/FruitItem.vue";
import { Fruit } from "@/plugins/api/apiInterfaces";

@Component({
  components:{
    FruitItem
  }
})
export default class Home extends Vue{
  fruits:Fruit[] = [];

  async mounted():Promise<void>{
    this.fruits = await Api.getUserFruits();
  }
}
</script>

<style scoped>
  .fruitCard{
    width: 25em;
    min-height: 20em;
  }
</style>