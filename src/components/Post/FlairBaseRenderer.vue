<template>
  <span :style="style">
    <span>
      <slot></slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  foregroundColor: string;
  backgroundColor: string;
}
const props = defineProps<Props>();

const style = computed(() => ({
  padding: '1px 4px',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '12px',
  color: props.foregroundColor,
  backgroundColor: props.backgroundColor,
}));
</script>
