<template>
  <q-item
    clickable
    :style="{ marginLeft: depth * 10 + 'px', padding: 0 }"
    @click="$emit('click')"
  >
    <q-item-section side style="padding: 0">
      <div
        :style="`width: 4px; min-height: 100%; background-color: ${getCommentColor(
          depth
        )}`"
      ></div>
    </q-item-section>
    <q-item-section style="padding: 8px 12px">
      <slot></slot>
    </q-item-section>
  </q-item>
  <q-separator />
</template>

<script setup lang="ts">
interface Props {
  depth: number;
}

defineProps<Props>();
defineEmits(['click']);

const indentColors = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
];

const getCommentColor = (depth: number) => {
  const colorIndex = depth % indentColors.length;
  return indentColors[colorIndex];
};
</script>
