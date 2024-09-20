<template>
  <div
    class="logging-overlay"
    v-if="logger.overlayLoggingEnabled"
    :style="{ backgroundColor: visible ? '#00000044' : '#00000000' }"
  >
    <q-btn
      flat
      icon="visibility"
      style="color: #fff; margin-left: 25%; pointer-events: all"
      @click="visible = !visible"
    />
    <template v-if="visible">
      <div
        v-for="(message, index) in messages.toReversed()"
        :key="index"
        :style="{ color: getColorForMessage(message) }"
      >
        {{ getTimeString(message) }} [{{ message.severity.toUpperCase() }}]
        {{ message.message }}
      </div></template
    >
  </div>
</template>

<script setup lang="ts">
import { LogMessage } from 'src/types/logger';
import { useLogger } from 'src/composables/logger';
import { computed, ref } from 'vue';

const logger = useLogger();
const messages = computed(() => logger.logEntries.value);
const visible = ref(false);

const getColorForMessage = (message: LogMessage) => {
  if (message.severity == 'error') return '#ff0000';
  else if (message.severity == 'warn') return '#ffbf00';
  else if (message.severity == 'info') return '#ffffff';
  else if (message.severity == 'debug') return '#ffffff';
};

const leading = (number: number, digits: number) => {
  return String(number).padStart(digits, '0');
};

const getTimeString = (message: LogMessage) => {
  const hoursStr = leading(message.time.getHours(), 2);
  const minutesStr = leading(message.time.getMinutes(), 2);
  const secondsStr = leading(message.time.getSeconds(), 2);
  const millisecondsStr = leading(message.time.getMilliseconds(), 3);
  return `${hoursStr}:${minutesStr}:${secondsStr}.${millisecondsStr}`;
};
</script>

<style>
.logging-overlay {
  position: fixed;
  width: 100vh;
  height: 100vh;
  pointer-events: none;
  color: #ff0000;
  font-size: 12px;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: #00000044;
  padding: 8px;
}
</style>
