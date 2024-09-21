<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    backdrop-filter="brightness(20%)"
  >
    <ImagePopupToolbar @close="close" />

    <VideoJsPlayer
      :sources="[{ url, type }]"
      :options="options"
      muted
      v-touch-swipe.down="close"
    />
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
  height: window.innerHeight - 34, // stay away from ios bottom touch area (TODO)
  playsinline: true, // ios safari plays fullscreen otherwise
  controlBar: {
    pictureInPictureToggle: false,
    fullscreenToggle: false,
    volumePanel: false,
  },
};
onMounted(() => statusBar.setColor('#000'));

const close = () => {
  statusBar.setDefaultColor();
  onDialogOK();
};
</script>
