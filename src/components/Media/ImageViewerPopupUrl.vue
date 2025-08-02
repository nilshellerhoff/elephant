<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    backdrop-filter="brightness(20%)"
  >
    <MediaPopupToolbar @close="close" @reset-zoom="resetZoom" />
    <ImageViewer ref="imageViewerRef" :url @close="close" />
  </q-dialog>
</template>
<script setup lang="ts">
import MediaPopupToolbar from 'components/Media/MediaPopupToolbar.vue';
import { onMounted, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useStatusbar } from 'src/composables/statusbar';
import ImageViewer from 'components/Post/ImageViewer.vue';

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const statusBar = useStatusbar();

interface Props {
  url: string;
}
const { url } = defineProps<Props>();
defineEmits([...useDialogPluginComponent.emits]);

const imageViewerRef = ref();

const resetZoom = () => {
  if (imageViewerRef.value && 'reset' in imageViewerRef.value) {
    imageViewerRef.value.reset();
  }
};

const close = () => {
  statusBar.setDefaultColor();
  onDialogOK();
};

onMounted(() => statusBar.setColor('#000'));
</script>
