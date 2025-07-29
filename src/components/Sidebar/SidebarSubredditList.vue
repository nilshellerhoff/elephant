<template>
  <q-item
    v-for="subscription in listsStore.subscriptions"
    :key="subscription.code"
    :to="`/r/${subscription.code}`"
  >
    <q-item-section avatar>
      <q-avatar>
        <q-img :src="subscription.iconUrl" alt="" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <b>r/{{ subscription.code }}</b>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useListsStore } from 'stores/lists-store';

const listsStore = useListsStore();
</script>
