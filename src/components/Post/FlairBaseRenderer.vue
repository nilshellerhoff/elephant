<template>
  <span :style="style">
    <span>
      <slot></slot>
    </span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  foregroundColor: string;
  backgroundColor: string;
}

const props = withDefaults(defineProps<Props>(), {
  foregroundColor: '#eee',
  backgroundColor: '#000',
});

const style = {
  padding: '2px 4px',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '13px',
  color: props.foregroundColor,
  backgroundColor: props.backgroundColor,
};
</script>
