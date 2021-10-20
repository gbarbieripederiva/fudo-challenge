<template>
  <b-navbar variant="danger">
    <b-navbar-brand to="/">{{appName}}</b-navbar-brand>
    <b-navbar-nav v-if="!isLogged" class="ml-auto">
      <b-nav-item to="/login">Iniciar sesión</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav v-else class="ml-auto">
      <b-container class="d-flex flex-row justify-content-center align-item-center">
          <img class="userIcon" :src="UserIcon">
          <span class="ml-3 d-flex flex-column justify-content-center align-items-center">
            <h6 class="m-0">{{user.username}}</h6>
            <a @click="logout" class="logoutA">cerrar sesión</a>
          </span>
      </b-container>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component,Vue } from "vue-property-decorator";
import Api from "@/plugins/api/api";
import { User } from "@/plugins/api/apiInterfaces";
import UserIcon from "@/assets/userIcon.svg";

@Component
export default class Navbar extends Vue{
  appName = process.env.VUE_APP_NAME;
  UserIcon = UserIcon;

  get isLogged():boolean{
    return Api.isLogged;
  }
  get user():User|null{
    return Api.user;
  }
  async logout(){
    await Api.logout();
    this.$router.push({name:"Login"})
  }
}
</script>

<style scoped>
.logoutA{
  font-size: .8rem;
  text-decoration: none;
  cursor: pointer;
}
.userIcon{
  width: 2em;
}
</style>