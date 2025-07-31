<template>
    <div class="wrapper">
      <Pokemon />
    </div>
</template>

<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router';
import Pokemon from './views/Pokemon.vue';
import { ref, onMounted, reactive, nextTick } from 'vue';
import { set, useFetch } from '@vueuse/core'
import router from './router';
</script>

<style scoped>

</style>
