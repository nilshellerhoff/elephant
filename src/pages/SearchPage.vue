<template>
  <q-input v-model="input"></q-input>
  <q-btn v-if="input" :label="`go to r/${input}`" :to="`/r/${input}`" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref('');
</script>
