<template>
  <div
    :style="{
      width: thumbnailSize,
      height: thumbnailSize,
      position: 'relative',
    }"
    @click.stop="$emit('openMedia', post)"
  >
    <q-icon
      v-if="thumbnailUrl === undefined"
      name="subject"
      :size="thumbnailSize"
    />
    <div v-else style="overflow: hidden">
      <q-img
        :ratio="1"
        :fit="'cover'"
        :src="thumbnailUrl"
        :style="{
          filter: blurThumbnail ? 'blur(8px)' : 'none',
        }"
      >
        <template #loading>
          <q-icon name="image" size="50px" />
        </template>
      </q-img>
    </div>
    <div
      v-if="mediaInfo.icon !== undefined"
      style="
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: linear-gradient(#0000 0%, #0007 50%, #0007 100%);
      "
    >
      <q-icon
        style="margin: 3px; filter: none"
        size="20px"
        color="white"
        :name="mediaInfo.icon"
      />
      <span
        v-if="mediaInfo.text"
        style="
          font-weight: bold;
          color: white;
          font-size: 12px;
          position: relative;
          top: 1px;
        "
      >
        {{ mediaInfo.text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import { getVideoDuration, isGallery, isImage, isVideo } from 'src/util/media';
import { computed } from 'vue';
import { useSettingsStore } from 'stores/settings-store';
import { getThumbnailUrl } from 'src/util/post';
import { getDurationStr } from 'src/util/time';

interface Props {
  post: Post;
}
const props = defineProps<Props>();
defineEmits<{
  openMedia: [post: Post];
}>();

const settingsStore = useSettingsStore();

const thumbnailSize = '70px';
const blurThumbnail = computed(
  () => settingsStore.blurNsfwThumbnails && props.post.data.over_18
);

const thumbnailUrl = computed(() => getThumbnailUrl(props.post));

const mediaInfo = computed(() => {
  if (isImage(props.post)) {
    return { icon: 'image' };
  } else if (isGallery(props.post)) {
    return { icon: 'photo_library' };
  } else if (isVideo(props.post)) {
    const duration = getVideoDuration(props.post);
    if (duration === undefined) return { icon: 'play_arrow' };
    return { icon: 'play_arrow', text: getDurationStr(duration) };
  } else if (!props.post.data.url.endsWith(props.post.data.permalink)) {
    return { icon: 'link' };
  } else {
    return {};
  }
});
</script>
