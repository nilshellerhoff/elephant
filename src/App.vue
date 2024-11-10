<template>
  <router-view />
  <LoggingOverlay />
</template>

<script setup lang="ts">
import { useStatusbar } from 'src/composables/statusbar';
import { useLogger } from 'src/composables/logger';
import LoggingOverlay from 'components/LoggingOverlay.vue';
import { useSettingsStore } from 'stores/settings-store';

const statusBar = useStatusbar();
const logger = useLogger();

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    statusBar.resetColor();
  }
});

// Initialize Stores if needed
const settingsStore = useSettingsStore();
settingsStore.init();

logger.debug('App initialized');
logger.info('Some Info');
logger.warn('Something bad about to happen');
logger.error('Whoa an error occurred');
</script>
