<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    backdrop-filter="brightness(20%)"
  >
    <ImagePopupToolbar @close="close" />

    <div style="width: 100%; height: 100%">
      <VideoJsPlayer :sources="[{ url, type }]" :options="options" />
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import VideoJsPlayer from 'components/Media/VideoPlayer/VideoJsPlayer.vue';
import { useDialogPluginComponent } from 'quasar';
import { onMounted } from 'vue';
import ImagePopupToolbar from 'components/Media/ImagePopupToolbar.vue';
import { useStatusbar } from 'src/composables/statusbar';

interface Props {
  url: string;
  type: string;
}
defineProps<Props>();
defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const statusBar = useStatusbar();

const options = {
  width: window.innerWidth,
  height: window.innerHeight,
};
onMounted(() => statusBar.setColor('#000'));

const close = () => {
  statusBar.setDefaultColor();
  onDialogOK();
};
</script>
