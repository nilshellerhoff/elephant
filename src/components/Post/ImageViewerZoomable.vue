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
    v-touch-swipe.down.up.right.left="swipeEnabled ? swipeHandler : undefined"
    @click="handleOnClick"
    :class="isDoubleTapZooming ? 'animated' : ''"
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
const emit = defineEmits(['swipeUp', 'close', 'swipeLeft', 'swipeRight']);
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

  swipeEnabled.value = e.scale === 1;
};

const swipeEnabled = ref(false);
const swipeHandler: TouchSwipeValue = (ev) => {
  console.log(`detected swipe ${ev.direction}`);

  if (zoomState.scale !== 1) return ev;

  // wait for 100ms before emitting close in case swiping was part of zooming in event
  setTimeout(() => {
    if (zoomState.scale === 1) {
      // when only listening for touches we get a TouchEvent for sure
      const touches = (ev.evt as TouchEvent).touches;
      // only emit if only one finger
      if (touches.length != 1) return ev;

      if (ev.direction === 'down') emit('close');
      if (ev.direction === 'up') emit('swipeUp');
      if (ev.direction === 'left') emit('swipeLeft');
      if (ev.direction === 'right') emit('swipeRight');
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

const lastClickTime = ref<number>();
const handleOnClick = (): void => {
  const doubleClickThreshold = 300;
  const clickNow = Date.now();
  if (lastClickTime.value) {
    if (clickNow - lastClickTime.value < doubleClickThreshold) {
      handleDoubleClick();
    }
  }
  lastClickTime.value = clickNow;
};

const isDoubleTapZooming = ref(false);
const handleDoubleClick = (): void => {
  isDoubleTapZooming.value = true;

  if (zoomState.scale === 1) {
    zoomer.value?.setData({
      scale: zoomState.scale * 3,
    });
  } else {
    zoomer.value?.setData({
      scale: 1,
    });
  }
  // we need to wait until zoom has finished before removing css class again
  setTimeout(() => {
    isDoubleTapZooming.value = false;
  }, 150);
};

defineExpose({ reset });
</script>

<style>
.image {
  max-width: 100%;
  max-height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.animated .pinch-scroll-zoom__content {
  transition: 150ms all;
}
</style>
