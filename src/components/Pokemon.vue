<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';

const props = defineProps<{
  msg: string,
  name: string,
  id: number,
  height: number,
  weight: number,
  thumbnail: string,
  img: string,
  abilities: []
}>()

//console.log(to.meta)
</script>

<template>
  <div class="greetings component">
    <h1 class="green">{{ msg }}</h1>
    <img :src=img />
    <h3>{{ $route.params.name }}</h3>
    <ul>
      <li>{{ $route.meta.height }}</li>
      <li>{{ $route.meta.weight }}</li>
      <li>{{ $route.meta.id }}</li>
      <li>{{ name }}</li>
      <li>{{ id }}</li>
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
