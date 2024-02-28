<script setup lang="ts">
import {
  DButton, DCardSubtitle,
  DCardTitle,
  DColumn, DDivider,
  DGrid,
  DImageDiffuse,
  DRoot,
  DRow,
  DSpacer,
  DTextfield,
  DToolbar,
  Rounded,
  Size,
  ThemeColorProperty
} from "vuelize";
import {computed, onMounted, ref, watch} from "vue";
import {Artist} from "./types/Artist.type";
import {Events} from "./types/Events";
import EventItem from "./components/EventItem.vue";
import {AppDataSource} from "./dataSource";
import {SavedArtist} from "./entities/SavedArtist.entity";
import { watchDebounced } from '@vueuse/core'

const name = ref();
const artist = ref<Artist>();
const events = ref<Events>([]);

watchDebounced(
    name,
    get,
    { debounce: 500, maxWait: 1000 },
)

async function get() {
  [artist.value, events.value] = await Promise.all([
    fetch(`https://rest.bandsintown.com/artists/${name.value}?app_id=13722599`).then((res) => res.json()).catch(() => null),
    fetch(`https://rest.bandsintown.com/artists/${name.value}/events?app_id=13722599`).then((res) => res.json()).catch(() => []),
  ]);
}

const savedArtists = ref<SavedArtist[]>([])
async function getSaved(){
  savedArtists.value = await AppDataSource.getRepository(SavedArtist).find({
    order: {
      name: "asc"
    }
  });
}

onMounted(getSaved)

function saveCurrentArtist() {
  if (!artist.value) {
    return;
  }
  const savedArtist = new SavedArtist();
  savedArtist.artistId = parseInt(artist.value.id);
  savedArtist.name = artist.value.name;
  AppDataSource.getRepository(SavedArtist).save(savedArtist).then(getSaved);
}

async function removeCurrentArtist() {
  if (!isSaved.value || !artist.value) {
    return;
  }
  const savedArtist = await AppDataSource.getRepository(SavedArtist).findOne({where: {
    artistId: parseInt(artist.value?.id)
    }});
  if(!savedArtist){
    return;
  }
  AppDataSource.getRepository(SavedArtist).remove(savedArtist).then(getSaved);
}

const isSaved = computed(()=>{
  if(!artist.value){
    return false;
  }
  //@ts-ignore
  return !!savedArtists.value.find((x)=>x.artistId === parseInt(artist.value.id));
})
</script>

<template>
  <d-root>
    <d-toolbar>
      Vuesic
      <d-spacer/>
      <d-button v-if="isSaved" @click="removeCurrentArtist">
        Un-Favourite
      </d-button>
      <d-button v-else-if="artist" @click="saveCurrentArtist">
        Favourite
      </d-button>
      <d-textfield :model-value="savedArtists.findIndex((x)=>x.name === name)"
                   @update:modelValue="name = savedArtists[$event].name"
                   :items="savedArtists" select solo
                   search search-key="name"
                   placeholder="Favourite"
                   :color="ThemeColorProperty.primary"
      >
        <template #label="{item}">
          {{ item.name }}
        </template>
        <template #item="{item}">
          {{ item.name }}
        </template>
      </d-textfield>
      <d-textfield v-model="name" filled solo placeholder="Artist name" :color="ThemeColorProperty.primary"/>
    </d-toolbar>
    <d-column v-if="artist" gap>
      <d-column blur>
        <d-row align="start">
          <d-image-diffuse style="z-index: 2" :src="artist.image_url" width="500px" height="500px" :rounded="Rounded.xl" blur-amount="500px"/>
          <d-column>
            <d-card-title class="font-size-large">
              {{ artist.name }}
            </d-card-title>
            <d-card-subtitle class="font-size-medium">
              Links
            </d-card-subtitle>
            <d-grid :gap="8" :columns="5">
              <d-button v-for="link in artist.links" root-tag="a" :href="link.url" target="_blank" :size="Size.large"
                        block>
                {{ link.type }}
              </d-button>
            </d-grid>
          </d-column>
        </d-row>
      </d-column>
      <d-divider class="mx-3"/>
      <d-row justify="center">
        <d-column gap width="65vw">
          <EventItem v-for="event in events" :event="event" :key="event.id"/>
        </d-column>
      </d-row>
    </d-column>
  </d-root>
</template>

<style scoped>

</style>
