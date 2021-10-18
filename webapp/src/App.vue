<template>
  <b-container fluid class="m-0 p-0 h-100 d-flex flex-column" id="app">
    <Navbar/>
    <router-view/>
  </b-container>
</template>

<script lang="ts">
import { Component,Vue } from "vue-property-decorator";
import Navbar from "@/components/navbar/Navbar.vue";


@Component({
  components:{
    Navbar
  }
})
export default class App extends Vue{
  
}
</script>

<style>
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>