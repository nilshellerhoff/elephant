<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <ImagePopupToolbar @close="close" @reset-zoom="reset" />
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      swipeable
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
        <ImageViewerZoomable ref="zoomable" :url="url" @close="close" />
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { onMounted, ref } from 'vue';
import ImagePopupToolbar from 'components/Media/ImagePopupToolbar.vue';
import ImageViewerZoomable from 'components/Post/ImageViewerZoomable.vue';
import { useStatusbar } from 'components/composables/statusbar';

interface Props {
  urls: string[];
}
defineProps<Props>();
defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const statusBar = useStatusbar();

onMounted(() => statusBar.setColor('#000'));

const slide = ref(0);

const zoomable = ref();

const close = () => {
  statusBar.setDefaultColor();
  onDialogOK();
};

const reset = () => {
  zoomable.value[0].reset();
};
</script>
