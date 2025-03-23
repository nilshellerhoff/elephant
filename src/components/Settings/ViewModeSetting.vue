<template>
  <q-btn-toggle
    no-caps
    v-model="settingsStore.viewMode"
    toggle-color="primary"
    :options="[
      { label: 'List', icon: 'view_agenda', value: ViewMode.LIST },
      { label: 'Cards', icon: 'image', value: ViewMode.CARDS },
    ]"
  />
</template>
<script setup lang="ts">
import { useSettingsStore, ViewMode } from 'stores/settings-store';

const settingsStore = useSettingsStore();
</script>
