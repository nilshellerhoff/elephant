<template>
  <PinchScrollZoom
    ref="zoomer"
    within
    centered
    key-actions
    :min-scale="1"
    :max-scale="6"
    :width="width"
    :height="height"
    @scaling="(e) => onEvent('scaling', e)"
    @start-drag="(e) => onEvent('startDrag', e)"
    @stop-drag="(e) => onEvent('stopDrag', e)"
    @dragging="(e) => onEvent('dragging', e)"
    style="overflow: hidden"
    v-touch-swipe.down="onSwipeDown"
  >
    <q-img
      class="image"
      fit="contain"
      :ref="imageElement"
      :src="url"
      :draggable="false"
      spinner-color="white"
    />
  </PinchScrollZoom>
</template>

<script setup lang="ts">
import '@coddicat/vue-pinch-scroll-zoom/style.css';
import { ref, computed } from 'vue';
import PinchScrollZoom, {
  type PinchScrollZoomEmitData,
  type PinchScrollZoomExposed,
} from '@coddicat/vue-pinch-scroll-zoom';
import { TouchSwipeValue } from 'quasar';
import { useLogger } from 'src/composables/logger';

interface Props {
  url: string;
}
defineProps<Props>();
const emit = defineEmits(['close']);
const logger = useLogger();

const zoomer = ref<PinchScrollZoomExposed>();
const imageElement = ref();

const zoomState: PinchScrollZoomEmitData = {
  x: 0,
  y: 0,
  scale: 0,
  originX: 0,
  originY: 0,
  translateX: 0,
  translateY: 0,
};

const width = computed(() => window.innerWidth);
const height = computed(() => window.innerHeight);

const onEvent = (name: string, e: PinchScrollZoomEmitData): void => {
  logger.debug(`PinchScrollZoom fired ${name}`);
  zoomState.scale = e.scale;
  zoomState.originX = e.originX;
  zoomState.originY = e.originY;
  zoomState.translateX = e.translateX;
  zoomState.translateY = e.translateY;
};

const onSwipeDown: TouchSwipeValue = (e) => {
  console.log('swipe down');
  // wait for 100ms before emitting close in case swiping was part of zooming in event
  setTimeout(() => {
    if (zoomState.scale === 1) {
      logger.debug('swipeDown');
      // when only listening for touches we get a TouchEvent for sure
      const touches = (e.evt as TouchEvent).touches;
      // only emit if only one finger
      if (touches.length == 1) emit('close');
    }
  }, 100);
};

const reset = (): void => {
  zoomer.value?.setData({
    scale: 1,
    originX: 150,
    originY: 200,
    translateX: -100,
    translateY: -50,
  });
};
defineExpose({ reset });
</script>

<style scoped>
.image {
  max-width: 100%;
  max-height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
