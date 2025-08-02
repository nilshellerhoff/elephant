<template>
  <ImageViewerZoomable ref="zoomable" :url="url" @close="$emit('close')" />
</template>

<script setup lang="ts">
import ImageViewerZoomable from 'components/Post/ImageViewerZoomable.vue';
import { ref } from 'vue';

interface Props {
  url: string;
}
defineProps<Props>();
interface Emits {
  close: [];
}
defineEmits<Emits>();
defineExpose({ reset: () => reset() });
const zoomable = ref();

const reset = () => {
  zoomable.value.reset();
};
</script>
