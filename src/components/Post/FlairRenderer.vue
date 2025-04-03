<template>
  <FlairBaseRenderer
    v-if="flairType == 'richtext'"
    :background-color="backgroundColor"
    :foreground-color="foregroundColor"
  >
    <span v-if="flairType == 'richtext'" v-html="renderRichtextFlair()"></span>
    <span v-else>
      {{ flairText }}
    </span>
  </FlairBaseRenderer>
</template>

<script setup lang="ts">
import FlairBaseRenderer from 'components/Post/FlairBaseRenderer.vue';
import { computed } from 'vue';
import {
  FlairBackgroundColor,
  FlairRichtextPart,
  FlairTextColor,
  FlairType,
} from 'src/types/reddit/flair';
import { useSettingsStore } from 'stores/settings-store';
import { backgroundIsSet } from 'src/util/flair';

interface Props {
  flairRichtext: FlairRichtextPart[];
  flairType: FlairType;
  flairText: string;
  flairBackgroundColor: FlairBackgroundColor;
  flairTextColor: FlairTextColor;
}

const props = defineProps<Props>();
const settingsStore = useSettingsStore();

const renderRichtextFlair = () => {
  return props.flairRichtext.reduce((acc, curr) => {
    if (curr.e == 'text') return acc + curr.t;
    else if (curr.e == 'emoji')
      return (
        acc +
        `<img width=14 style="vertical-align: top" src=${curr.u} alt=${curr.a} />`
      );
    else return acc + curr.e;
  }, '');
};

const foregroundColor = computed(() => {
  if (backgroundIsSet(props.flairBackgroundColor)) {
    if (props.flairTextColor === 'light') return '#eee';
    if (props.flairTextColor === 'dark') return '#111';
  }
  return settingsStore.isDark ? '#eee' : '#111';
});

const backgroundColor = computed(() => {
  if (backgroundIsSet(props.flairBackgroundColor))
    return props.flairBackgroundColor || 'transparent';
  return settingsStore.isDark ? '#111' : '#eee';
});
</script>
