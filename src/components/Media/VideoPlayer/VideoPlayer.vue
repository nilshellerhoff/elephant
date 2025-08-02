<template>
  <VideoJsPlayer
    :sources="[{ url, type }]"
    :options="options"
    muted
    v-touch-swipe.down="swipeDownHandler"
  />
</template>

<script setup lang="ts">
import VideoJsPlayer from 'components/Media/VideoPlayer/VideoJsPlayer.vue';

interface Props {
  url: string;
  type: string;
}
defineProps<Props>();
interface Emits {
  close: [];
}
const emit = defineEmits<Emits>();

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

const swipeDownHandler = () => {
  emit('close');
};
</script>
