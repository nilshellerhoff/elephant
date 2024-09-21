<template>
  <div>
    <video
      controls
      autoplay
      ref="videoPlayer"
      class="video-js vjs-theme-forest"
    >
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
import '@videojs/themes/dist/forest/index.css';
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue';
import Player from 'video.js/dist/types/player';
import Button from 'video.js/dist/types/button';

type Source = {
  url: string;
  type?: string;
};

interface Props {
  sources: Source[];
  /* eslint-disable @typescript-eslint/no-explicit-any -- no typing in VideoJS module */
  options?: any;
  muted?: boolean;
}
const props = withDefaults(defineProps<Props>(), { options: {} });

const player: Ref<Player | undefined> = ref();
const videoPlayer: Ref<Element | undefined> = ref();

onMounted(() => {
  if (videoPlayer.value) {
    player.value = videojs(videoPlayer.value, props.options, () => {
      console.log(player.value);
    });
    if (props.muted) player.value.muted(true);

    addMuteButton(player.value, props.muted);
  } else console.log('whoops');
});

const addMuteButton = (player: Player, muted = false) => {
  var Button = videojs.getComponent('Button');
  var button = new Button(player, {
    // no arrow-function here because of 'this'
    clickHandler: function () {
      if (player) {
        if (player.muted()) {
          // unmuting the player
          player.muted(false);
          muteButtonSetUnmutedState(this as unknown as Button);
        } else {
          // muting the player
          player.muted(true);
          muteButtonSetMutedState(this as unknown as Button);
        }
      }
    },
  }) as Button;
  button.addClass('vjs-custom-mute-toggle');

  // initializing the mute button state
  if (muted) muteButtonSetMutedState(button);
  else muteButtonSetUnmutedState(button);

  const controlBar = player.getChild('ControlBar');
  if (!controlBar) throw 'No controlbar element!';
  controlBar.addChild(button);
};

const muteButtonSetMutedState = (button: Button) => {
  button.addClass('vjs-custom-mute-toggle-muted');
  button.removeClass('vjs-custom-mute-toggle-unmuted');
};

const muteButtonSetUnmutedState = (button: Button) => {
  button.addClass('vjs-custom-mute-toggle-unmuted');
  button.removeClass('vjs-custom-mute-toggle-muted');
};

onBeforeUnmount(() => {
  if (player.value) player.value.dispose();
});
</script>

<style>
* {
  --vjs-theme-forest--primary: #5e0040;
}

.vjs-custom-mute-toggle {
  font-family: 'VideoJS';
}

.vjs-custom-mute-toggle-unmuted .vjs-icon-placeholder:before {
  content: '\f107';
}

.vjs-custom-mute-toggle-muted .vjs-icon-placeholder:before {
  content: '\f104';
}
</style>
