<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <ImagePopupToolbar @close="onDialogOK" @reset-zoom="reset" />
    <ImageViewerZoomable ref="zoomable" :url="url" @close="onDialogOK" />
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import ImageViewerZoomable from 'components/Post/ImageViewerZoomable.vue';
import { ref } from 'vue';
import ImagePopupToolbar from 'components/Media/ImagePopupToolbar.vue';

interface Props {
  url: string;
}
defineProps<Props>();
defineEmits([...useDialogPluginComponent.emits]);

const zoomable = ref();

const reset = () => {
  zoomable.value.reset();
};

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
</script>
