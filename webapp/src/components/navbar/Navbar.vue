<template>
  <b-navbar variant="danger">
    <b-navbar-brand to="/">Fruits</b-navbar-brand>
    <b-navbar-nav v-if="!isLogged" class="ml-auto">
      <b-nav-item to="/login">Iniciar sesión</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav v-else class="ml-auto">
      <b-nav-item>{{user.username}}</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component,Vue } from "vue-property-decorator";
import Api from "@/plugins/api/api";
import { User } from "@/plugins/api/apiInterfaces";

@Component
export default class Navbar extends Vue{
  get isLogged():boolean{
    return Api.isLogged;
  }
  get user():User|null{
    return Api.user;
  }
}
</script>