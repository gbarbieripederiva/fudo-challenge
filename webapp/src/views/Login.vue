<template>
  <b-container class="h-100 d-flex justify-content-center align-items-center">
    <b-card title="Login" class="w-50">
      <b-form @submit="handleSubmit">
        <b-container>
          <b-row class="mt-3">
            <b-form-input
              v-model="username"
              placeholder="username"
              :state="isUsernameValid"
            ></b-form-input>
            <b-form-invalid-feedback :state="isUsernameValid">
              El username no puede estar vacío
            </b-form-invalid-feedback>
          </b-row>
          <b-row class="mt-3">
            <b-form-input
              v-model="password"
              placeholder="password"
              type="password"
              :state="isPasswordValid"
            ></b-form-input>
            <b-form-invalid-feedback :state="isPasswordValid">
              La contraseña no puede estar vacía
            </b-form-invalid-feedback>
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
import Api from "@/plugins/api/api";

@Component
export default class Login extends Vue {
  username = "";
  password = "";

  
  get isUsernameValid() : boolean {
    return this.username.length > 0;
  }
  
  get isPasswordValid() : boolean {
    return this.password.length > 0;
  }
  

  handleSubmit(e: Event):void {
    e.preventDefault();
    Api.login(this.username,this.password).then((user)=>{
      if (user) {
        this.$router.push({name:"Home"})
      }else{
        this.$bvToast.toast("No se pudo acceder",{
          headerClass:"d-none",
          variant:"danger"
        })
      }
    })
  }
}
</script>
