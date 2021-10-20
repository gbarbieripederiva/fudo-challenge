<template>
  <b-modal v-model="showModal" @ok="onConfirm" @cancel="onCancel">
    <template slot="modal-header">
        <h5 class="modal-title">Agregar fruta</h5>
    </template>
    <b-form>
        <b-form-group label="Nombre">
            <b-form-input placeholder="ej:Manzana" type="text" v-model="name"></b-form-input>
        </b-form-group>
        <b-form-group label="Color caracteristico">
            <b-form-input type="color" v-model="color"></b-form-input>
        </b-form-group>
        <b-form-group label="Nombre del color caracteristico">
            <b-form-input placeholder="ej: Rojo" type="text" v-model="colorName"></b-form-input>
        </b-form-group>
    </b-form>
    <template #modal-footer="{ok,cancel}">
        <b-btn variant="danger" @click="cancel()">
            Cancelar
        </b-btn>
        <b-btn variant="success" @click="ok()">
            Agregar
        </b-btn>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Fruit } from "@/plugins/api/apiInterfaces";
import { Vue, Component, VModel, Emit } from "vue-property-decorator";

@Component
export default class AddFruitModal extends Vue {
  @VModel({ type: Boolean, default:false })
  showModal!: boolean;

  name = "";
  color = "#FF0000";
  colorName = "";

  @Emit("cancel")
  onCancel(): boolean {
    return false;
  }
  @Emit("confirm")
  onConfirm():Fruit {
    return {
        name:this.name,            
        color:this.color.substring(1),        
        colorName:this.colorName
    };
  }
}
</script>

<style scoped>
.colorPicker{
    width: 3em;
    height: 3em;
}
</style>