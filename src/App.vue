<script setup lang="ts">
import {
  DButton,
  DCard,
  DCardSubtitle,
  DCardTitle,
  DColumn,
  DDivider,
  DGrid,
  DImageDiffuse,
  DRoot,
  DRow,
  DSpacer,
  DTextfield,
  DToolbar,
  DTypography,
  Rounded,
  Size,
  ThemeColorProperty
} from "vuelize";
import {computed, onMounted, ref} from "vue";
import {Artist} from "./types/Artist.type";
import {Events} from "./types/Events";
import EventItem from "./components/EventItem.vue";
import {AppDataSource} from "./dataSource";
import {SavedArtist} from "./entities/SavedArtist.entity";
import {watchDebounced} from '@vueuse/core'

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
      <d-card-title class="font-size-medium">
        Vuesic
      </d-card-title>
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
        <d-column v-if="events.length" gap width="65vw">
          <EventItem v-for="event in events" :event="event" :key="event.id"/>
        </d-column>
        <d-typography v-else class="px-3">
          "{{name}}" has no events in the near future...
        </d-typography>
      </d-row>
    </d-column>
    <d-column v-else justify="center" align="center" block height="80vh">
      <d-card width="30vw" height="40vh" blur :rounded="Rounded.xl" outlined class="pa-2">
        <d-card-title>
          Welcome to <i>VUE</i>SIC!
        </d-card-title>
        <d-card-subtitle style="text-align: start" class="ma-0">
          Vuesic is a platform dedicated to providing detailed information about performances by various artists. Our goal is to make it easy for you to find and explore performances from around the world.
          <br/>
          <br/>
          Whether you're looking for concerts, theater performances, or dance events, Vuesic offers a database that includes details such as dates, locations, and descriptions. Our site is designed to be user-friendly, making it simple to search for performances by artist, location, or date.
          <br/>
          <br/>
          Join Vuesic to enhance your experience of artistic performances. Explore, discover, and enjoy the world of music, theater, and dance with us.
        </d-card-subtitle>
      </d-card>
    </d-column>
  </d-root>
</template>

<style scoped>

</style>
