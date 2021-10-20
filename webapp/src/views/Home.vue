<template>
  <b-container class="h-100 d-flex justify-content-center align-items-center">
    <b-card title="Frutas">
      <b-list-group flush>
        <b-list-group-item v-for="f in fruits" :key="f.id"><FruitItem :fruit="f"/></b-list-group-item>
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