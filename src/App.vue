<template>
  <router-view />
  <LoggingOverlay />
</template>

<script setup lang="ts">
import { useStatusbar } from 'components/composables/statusbar';
import { useLogger } from 'components/composables/logger';
import LoggingOverlay from 'components/LoggingOverlay.vue';

const statusBar = useStatusbar();
const logger = useLogger();

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    statusBar.resetColor();
  }
});

logger.debug('App initialized');
logger.info('Some Info');
logger.warn('Something bad about to happen');
logger.error('Whoa an error occurred');
</script>
