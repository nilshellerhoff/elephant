<template>
  <router-view />
</template>

<script setup lang="ts">
import { useStatusbar } from 'components/composables/statusbar';

const statusBar = useStatusbar();

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    statusBar.resetColor();
  }
});
</script>
