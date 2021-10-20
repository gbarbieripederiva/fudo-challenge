<template>
    <b-container fluid class="p-0">
        <b-row class="d-flex justify-content-start align-items-center">
            <span v-b-tooltip.hover :title="fruit.colorName" :style="spanStyle" class="mx-4">
                <img class="fruits-icon hola" :src="fruitIcon">
            </span>
            <p>{{fruit.name}}</p>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Vue,Component,Prop } from "vue-property-decorator";
import { Fruit } from "@/plugins/api/apiInterfaces";
import FruitIcon from "@/assets/fruitIcon.svg";


@Component
export default class FruitItem extends Vue{
    @Prop({required:true}) fruit:Fruit|undefined;
    fruitIcon = FruitIcon;
    get spanStyle() : string {
        return `border: 5px solid #${this.fruit?.color};`
    }
    
}
</script>

<style scoped>
    .fruits-icon{
        height: 2em;
    }
    p{
        margin: 0;
        padding: 0;
    }
</style>