<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

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
              imgURL = ref(newData.sprites.front_shiny);
              key = ref(newData.id);
              bigImgURL = ref(newData.sprites.other.dream_world.front_default);
              abilities = ref(formatAbilities);
              height = ref(newData.height);
              weight = ref(newData.weight);
              id = ref(newData.id);
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

const abilitiesList = computed(()=>{
  let listString = "";
  abilities.value.map((ability, index)=>{
    if(index > abilities.value.length-2){
      listString += `${ability}`;
    }
    else{
      listString += `${ability}, `;
    }
  })
  return listString
})

</script>

<template>
  <div class="component">
    <RouterLink to="/"><- back to Pokedex</RouterLink>
    <h2>{{ $route.params.name }}</h2>
    <img v-bind:src="bigImgURL" />
    <ul v-if="loaded">
      <li>height: {{ height }}</li>
      <li>weight: {{ weight }}</li>
      <li>abilities: {{ abilitiesList }}</li>
    </ul>
  </div>
</template>

<style scoped>
  div{
    text-transform: capitalize;
  }
</style>
