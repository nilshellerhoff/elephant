<template>
  <MediaPopupToolbar @close="$emit('close')">
    <template #additionalActions>
      <q-btn
        icon="fit_screen"
        style="color: #fff; float: right"
        size="20px"
        @click="reset"
        flat
      />
    </template>
  </MediaPopupToolbar>
  <ImageViewerZoomable ref="zoomable" :url="url" @close="$emit('close')" />
</template>

<script setup lang="ts">
import ImageViewerZoomable from 'components/Post/ImageViewerZoomable.vue';
import { ref } from 'vue';
import MediaPopupToolbar from 'components/Media/MediaPopupToolbar.vue';

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
