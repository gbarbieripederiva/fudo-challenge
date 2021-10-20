<template>
    <b-container fluid>
        <b-row>{{fruit.color}}-{{fruit.name}}-{{fruit.colorName}}</b-row>
    </b-container>
</template>

<script lang="ts">
import { Vue,Component,Prop } from "vue-property-decorator";
import { Fruit } from "@/plugins/api/apiInterfaces";


@Component
export default class FruitItem extends Vue{
    @Prop({required:true}) fruit:Fruit|undefined;
}
</script>