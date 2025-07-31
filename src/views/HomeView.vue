<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router';
import Pokemon from './Pokemon.vue';
import { ref, onMounted, reactive, nextTick } from 'vue';
import { set, useFetch } from '@vueuse/core'
import router from '../router';

const loaded = ref(false);
const loading = ref(true);
const error = ref(null);
let pokemons = ref([]);

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
            const bigImgURL = newData.sprites.other.dream_world.front_default;
            const abilities = newData.abilities;
            const height = newData.height;
            const weight = newData.weight;
            const id = newData.id;
            pokemon.thumbnail = imgURL;
            pokemon.key = key;
            pokemon.img = bigImgURL;
            pokemon.abilities = abilities;
            pokemon.height = height;
            pokemon.weight = weight;
            pokemon.id = id;
            pokemons.value.push(reactive(pokemon));
            //router.addRoute({path: '/:name',name: ':name',component: ()=>import('../components/Pokemon.vue'),props: {height: 100, weight: 100}},);
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
  loaded.value = true;
});
</script>

<style scoped>

</style>

<template>
    <div class="wrapper">
      <nav>
        <RouterLink v-if="loading" to="/">Loading Data...</RouterLink>
        <RouterLink v-if="loaded" v-for="pokemon in pokemons" :key="pokemon.key" :id="pokemon.id" :to="pokemon.name">
          {{pokemon.name}}
          <img v-bind:src="pokemon.thumbnail" />
        </RouterLink>
      </nav>
    </div>
</template>
