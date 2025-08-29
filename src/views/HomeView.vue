<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router';
import { ref, onMounted, reactive, computed, nextTick, getCurrentInstance } from 'vue';

const loaded = ref(false);
const loading = ref(true);
const error = ref(null);
let pokemons = ref([]);
const searchQuery = ref("");

onMounted(async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60')
    .then(async response => response.json())
    .then(async data => {
      data.results.map(async (pokemon: Object) => {
        const newResponse = await fetch(pokemon.url);
        const pokemonJSON: Object = newResponse.json().then(newData => {
            const imgURL = newData.sprites.front_shiny;
            const key = newData.id;
            pokemon.thumbnail = imgURL;
            pokemon.key = key;
            pokemons.value.push(reactive(pokemon));
          }
        )
      })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } 
  catch (e) {
    error.value = e.message;
  } 
  finally {
    loaded.value = true;
    loading.value = false;
  }
});



const filteredPokemons = computed(()=>{
  if(!searchQuery.value){
    return pokemons.value;
  }
  else{
    return [...pokemons.value].filter((pokemon) => pokemon.name.includes(searchQuery.value.toLowerCase()));
  }
})
</script>

<style scoped>

</style>

<template>
    <div class="wrapper">
      <search>
        <input type="text" v-model="searchQuery" placeholder="search pokemon"></input>
      </search>
      <nav>
        <RouterLink v-if="loading" to="/">Loading Data...</RouterLink>
        <RouterLink v-if="loaded" v-for="pokemon in filteredPokemons" :key="pokemon.key" :to="pokemon.name">
          {{pokemon.name}}
          <img v-bind:src="pokemon.thumbnail" />
        </RouterLink>
      </nav>
    </div>
</template>
