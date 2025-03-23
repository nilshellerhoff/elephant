<template>
  <q-btn-toggle
    no-caps
    v-model="settingsStore.darkMode"
    toggle-color="primary"
    :options="[
      { label: 'Light', value: DarkMode.light },
      { label: 'Auto', value: DarkMode.auto },
      { label: 'Dark', value: DarkMode.dark },
    ]"
    @update:model-value="(val) => settingsStore.setDarkMode(val)"
  />
</template>
<script setup lang="ts">
import { DarkMode, useSettingsStore } from 'stores/settings-store';

const settingsStore = useSettingsStore();
</script>
