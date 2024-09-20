<template>
  <div>
    <video controls autoplay ref="videoPlayer" class="video-js">
      <source
        v-for="(source, index) in sources"
        :src="source.url"
        :type="source.type"
        :key="index"
      />
    </video>
  </div>
</template>

<script setup lang="ts">
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue';
import Player from 'video.js/dist/types/player';

type Source = {
  url: string;
  type?: string;
};

interface Props {
  sources: Source[];
  /* eslint-disable @typescript-eslint/no-explicit-any -- no typing in VideoJS module */
  options: any;
}
const props = withDefaults(defineProps<Props>(), { options: {} });

const player: Ref<Player | undefined> = ref();
const videoPlayer: Ref<Element | undefined> = ref();

onMounted(() => {
  if (videoPlayer.value) {
    player.value = videojs(videoPlayer.value, props.options, () => {
      console.log(player.value);
    });
  } else console.log('whoops');
});

onBeforeUnmount(() => {
  if (player.value) player.value.dispose();
});
</script>
