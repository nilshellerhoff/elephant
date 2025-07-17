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
      v-if="mediaIcon !== undefined"
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
        :name="mediaIcon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import { isGallery, isImage, isVideo } from 'src/util/media';
import { computed } from 'vue';
import { useSettingsStore } from 'stores/settings-store';
import { getThumbnailUrl } from 'src/util/post';

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

const mediaIcon = computed(() => {
  if (isImage(props.post)) {
    return 'image';
  } else if (isGallery(props.post)) {
    return 'photo_library';
  } else if (isVideo(props.post)) {
    return 'play_arrow';
  } else if (!props.post.data.url.endsWith(props.post.data.permalink)) {
    return 'link';
  } else {
    return undefined;
  }
});
</script>
