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
            <b-form-input @change="handleColorPickerChange" type="color" v-model="color"></b-form-input>
        </b-form-group>
        <b-form-group label="Nombre del color caracteristico">
            <b-form-input :placeholder="colorNamePlaceholder" type="text" v-model="colorName"></b-form-input>
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
/*
  ColorTable taken from https://gist.github.com/lunohodov/1995178
  and adapted
*/ 
import ColorTable from "@/assets/colorTable.json"

@Component
export default class AddFruitModal extends Vue {
  @VModel({ type: Boolean, default:false })
  showModal!: boolean;
  

  name = "";
  color = "#FF0000";
  colorName = "";
  colorNameIsSetted = false;
  colorNamePlaceholder = "ej: Rojo"

  static ColorTable = ColorTable;

  // https://en.wikipedia.org/wiki/Color_difference#sRGB
  static ColorDiff(color1:number[],color2:number[]):number{
    const [r1,g1,b1] = color1
    const [r2,g2,b2] = color2

    const rl = (r1 + r2)/2;
    const dr = r1-r2
    const dg = g1-g2
    const db = b1-b2

    return Math.sqrt((2 + rl/256) * dr*dr + 4 * dg*dg + (2 + (255-rl)/256) * db*db)
  }

 static hexToRgb(hex:string):number[]|null {
    let shorthandRegex = /([\da-f])([\da-f])([\da-f])/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    let result = /([\da-f]{2})([\da-f]{2})([\da-f]{2})/i.exec(hex);
    return  result ? 
            [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] 
            : null;
  }

  handleColorPickerChange():void{
    let currRGB = AddFruitModal.hexToRgb(this.color);
    this.colorNamePlaceholder = "ej: " + AddFruitModal.ColorTable.reduce((acc,cur)=>{
      if(
          AddFruitModal.ColorDiff(acc.RGBArr,currRGB) 
          > AddFruitModal.ColorDiff(cur.RGBArr,currRGB)
        ){
          return cur;
        }else{
          return acc;
        }
    }).Spanish
  }

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