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
      :ref="imageElement"
      :src="url"
      :draggable="false"
      spinner-color="white"
    />
  </PinchScrollZoom>
  <div
    style="
      position: fixed;
      width: 100vh;
      height: 100vh;
      pointer-events: none;
      color: #ff0000;
      font-size: 16px;
    "
    v-if="false"
    v-html="logMessagesHtml"
  ></div>
</template>

<script setup lang="ts">
import '@coddicat/vue-pinch-scroll-zoom/style.css';
import { ref, computed, Ref } from 'vue';
import PinchScrollZoom, {
  type PinchScrollZoomEmitData,
  type PinchScrollZoomExposed,
} from '@coddicat/vue-pinch-scroll-zoom';
import { TouchSwipeValue } from 'quasar';

interface Props {
  url: string;
}
defineProps<Props>();
const emit = defineEmits(['close']);

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
  addLog(name);
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
      addLog('swipeDown');
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

const logMessages: Ref<string[]> = ref([]);
const addLog = (message: string) => {
  logMessages.value.push(message);
  if (logMessages.value.length > 25) logMessages.value.shift();
};
const logMessagesHtml = computed(() => logMessages.value.join('<br>'));

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
