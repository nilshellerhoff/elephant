<template>
  <q-carousel
    animated
    v-model="slide"
    arrows
    navigation
    style="background-color: #00000000"
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-carousel-slide
      v-for="(url, idx) in urls"
      :name="idx"
      :key="idx"
      style="padding: 0"
    >
      <ImageViewerZoomable
        ref="zoomable"
        :url="url"
        @close="$emit('close')"
        @swipe-right="previousSlide"
        @swipe-left="nextSlide"
      />
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ImageViewerZoomable from 'components/Post/ImageViewerZoomable.vue';
import { useStatusbar } from 'src/composables/statusbar';

interface Props {
  urls: string[];
}
const { urls } = defineProps<Props>();
defineEmits(['close']);
defineExpose({ reset: () => reset() });

const statusBar = useStatusbar();

onMounted(() => statusBar.setColor('#000'));

const slide = ref(0);
const previousSlide = () => {
  if (slide.value > 0) {
    slide.value--;
  }
};
const nextSlide = () => {
  if (slide.value < urls.length - 1) {
    slide.value++;
  }
};

const zoomable = ref();

const reset = () => {
  zoomable.value[0].reset();
};
</script>
