<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    backdrop-filter="brightness(20%)"
  >
    <ImagePopupToolbar @close="close" @reset-zoom="reset" />
    <ImageViewerZoomable ref="zoomable" :url="url" @close="close" />
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import ImageViewerZoomable from 'components/Post/ImageViewerZoomable.vue';
import { onMounted, ref } from 'vue';
import ImagePopupToolbar from 'components/Media/ImagePopupToolbar.vue';
import { useStatusbar } from 'src/composables/statusbar';

interface Props {
  url: string;
}
defineProps<Props>();
defineEmits([...useDialogPluginComponent.emits]);

const zoomable = ref();

const reset = () => {
  zoomable.value.reset();
};

const close = () => {
  statusBar.setDefaultColor();
  onDialogOK();
};

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const statusBar = useStatusbar();

onMounted(() => statusBar.setColor('#000'));
</script>
