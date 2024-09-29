<template>
  <q-input v-model="input"></q-input>
  <q-btn v-if="input" :label="`go to r/${input}`" :to="`/r/${input}`" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePageTitle } from 'src/composables/pageTitle';

const title = usePageTitle();

title.setTitle('Search');

const input = ref('');
</script>
