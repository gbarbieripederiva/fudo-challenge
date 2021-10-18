<template>
  <b-container class="h-100 d-flex justify-content-center align-items-center">
    <b-card title="Login">
      <b-form @submit="handleSubmit">
        <b-container>
          <b-row class="mt-3">
            <b-form-input
              v-model="username"
              placeholder="username"
            ></b-form-input>
          </b-row>
          <b-row class="mt-3">
            <b-form-input
              v-model="password"
              placeholder="password"
              type="password"
            ></b-form-input>
          </b-row>
          <b-row class="mt-3 justify-content-end">
            <b-btn type="submit" variant="success">Login</b-btn>
          </b-row>
        </b-container>
      </b-form>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "@/plugins/api";

@Component
export default class Login extends Vue {
  username = "";
  password = "";

  handleSubmit(e: Event):void {
    e.preventDefault();
    console.log(this.username," ",this.password);
    Api.login(this.username,this.password).then(()=>{
      console.log("logged in");
      
      
    })
  }
}
</script>
