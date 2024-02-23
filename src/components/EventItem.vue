<script setup lang="ts">
import {PropType, ref} from "vue";
import {EventsChild} from "../types/Events";
import {DAccordion, DCard, DCardSubtitle, DCardTitle, DTypography} from "vuelize";
import VenueMap from "./VenueMap.vue";
import moment from "moment";

const props = defineProps({
  event: {type: Object as PropType<EventsChild>, required: true}
})

const mapOpen = ref(false);
</script>

<template>
  <d-card block>
    <d-card-title>
      {{ moment(event.datetime).format('DD.MM.yy hh:mm') }}
    </d-card-title>
    <d-grid :columns="1" :gap="8">
      <d-column :elevation="1">
        <d-card-subtitle class="font-size-medium">
          Venue {{ event.venue.name }}
        </d-card-subtitle>
        <d-accordion v-model="mapOpen" show-arrow>
          <template #header>
            Location
            <d-card-subtitle>
              {{event.venue.city}}, <d-typography>{{event.venue.country}}</d-typography>
          </d-card-subtitle>
          </template>
          <VenueMap
              style="width: 100%; height: 400px"
              :coords="[event.venue.latitude, event.venue.longitude]"
          />
        </d-accordion>
      </d-column>
    </d-grid>
  </d-card>
</template>

<style scoped>

</style>
