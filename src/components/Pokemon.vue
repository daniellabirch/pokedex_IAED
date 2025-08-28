<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  msg: string,
  name: string,
  id: number,
  height: number,
  weight: number,
  thumbnail: string,
  img: string,
  test: string,
  abilities: []
}>()

const route = useRoute();
const loaded = ref(false);
const loading = ref(true);
const error = ref(null);

let imgURL = ref();
let key = ref();
let bigImgURL = ref();
let abilities = ref();
let height = ref();
let weight = ref();
let id = ref();

onMounted(async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60')
    .then(async response => response.json())
    .then(async data => {
      data.results.map(async (pokemon)=>{
        if(pokemon.name == route.params.name){
          const newResponse = await fetch(pokemon.url);
          const pokemonJSON: Object = newResponse.json().then(newData => {
              let formatAbilities: Array<string> = [];
              newData.abilities.map((ability)=>{
                formatAbilities.push(ability.ability.name);
              });
              console.log(formatAbilities);
              imgURL = ref(newData.sprites.front_shiny);
              key = ref(newData.id);
              bigImgURL = ref(newData.sprites.other.dream_world.front_default);
              abilities = ref(formatAbilities);
              height = ref(newData.height);
              weight = ref(newData.weight);
              id = ref(newData.id);
              console.log(abilities);
              loaded.value = true;
              loading.value = false;
            }
          )
        }
      });
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } 
  catch (e) {
    error.value = e.message;
  } 
});

</script>

<template>
  <div class="component">
    <h2>{{ $route.params.name }}</h2>
    <img v-bind:src="bigImgURL" />
    <ul v-if="loaded">
      <li>height: {{ height }}</li>
      <li>weight: {{ weight }}</li>
      <li>abilities: <span v-for="ability in abilities">{{ ability }}, </span></li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
