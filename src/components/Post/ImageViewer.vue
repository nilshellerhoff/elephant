<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.2) 50%,
          rgba(0, 0, 0, 0.6) 100%
        );
        z-index: 1000;
      "
    >
      <q-btn
        icon="close"
        style="color: #fff; float: right"
        size="20px"
        @click="onDialogOK"
        flat
      />
      <q-btn
        icon="fit_screen"
        style="color: #fff; float: right"
        size="20px"
        @click="reset"
        flat
      />
    </div>
    <ImageViewerZoomable ref="zoomable" :url="url" @close="onDialogOK" />
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import ImageViewerZoomable from 'components/Post/ImageViewerZoomable.vue';
import { ref } from 'vue';

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
