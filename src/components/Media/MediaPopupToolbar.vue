<template>
  <div
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.2) 50%,
        rgba(0, 0, 0, 0.6) 100%
      );
      z-index: 1000;
    "
  >
    <q-btn
      icon="close"
      style="color: #fff; float: right"
      size="20px"
      @click="$emit('close')"
      flat
    />
    <q-btn
      icon="fit_screen"
      style="color: #fff; float: right"
      size="20px"
      @click="$emit('resetZoom')"
      flat
    />
  </div>
</template>

<script setup lang="ts">
interface Emits {
  close: [];
  resetZoom: [];
}
defineEmits<Emits>();
</script>
