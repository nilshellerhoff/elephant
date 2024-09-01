<template>
  <div class="inline-error">
    <span class="inline-error-message">
      {{ message }}
    </span>
    <q-btn
      flat
      dense
      label="Retry"
      icon="refresh"
      @click="$emit('retry')"
      style="float: right; margin: 3px 8px"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
}
defineProps<Props>();
defineEmits(['retry']);
</script>

<style>
.inline-error {
  background: #c10015;
  margin: 8px;
  width: calc(100% - 16px);
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  position: fixed;
  z-index: 10;
}

.inline-error-message {
  padding: 8px;
  display: inline-block;
}
</style>
