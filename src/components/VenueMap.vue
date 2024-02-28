<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {PropType, ref} from "vue";

const zoom = ref(10);

defineProps({
  coords: {type: Object as PropType<[[]]>, required:true}
})
</script>

<template>
  <l-map ref="map" v-model:zoom="zoom" :use-global-leaflet="false" :center="coords.at(0)">
    <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
    ></l-tile-layer>
    <l-marker v-for="coordinates in coords" :lat-lng="coordinates"/>
  </l-map>
</template>

<style scoped>

</style>
