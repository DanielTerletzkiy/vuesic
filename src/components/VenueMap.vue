<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {ref} from "vue";

const zoom = ref(40);

defineProps({
  coords: {type: Array, required:true}
})
</script>

<template>
  <l-map ref="map" v-model:zoom="zoom" :use-global-leaflet="false" :center="coords">
    <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
    ></l-tile-layer>
    <l-marker :lat-lng="coords"/>
  </l-map>
</template>

<style scoped>

</style>
