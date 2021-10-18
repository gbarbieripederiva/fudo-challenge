<template>
  <b-navbar variant="danger">
    <b-navbar-brand href="#">Fruits</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item to="/login">Login</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component,Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue{
}
</script>