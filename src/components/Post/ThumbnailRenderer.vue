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
    <q-img v-else :ratio="1" :fit="'cover'" :src="thumbnailUrl" />
    <div
      v-if="thumbnailUrl !== undefined"
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
        :name="getIconForType()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post } from 'src/types/reddit/post';
import { isGallery, isImage, isVideo } from 'src/util/media';
import { computed } from 'vue';

interface Props {
  post: Post;
}
const props = defineProps<Props>();
defineEmits<{
  openMedia: [post: Post];
}>();

const thumbnailSize = '70px';

const thumbnailUrl = computed(() => {
  let url: string | undefined = props.post.data.thumbnail;
  if (
    url == 'self' ||
    url == 'default' ||
    url == 'image' ||
    url == 'spoiler' ||
    url == 'nsfw'
  )
    url = undefined;

  url = url ?? props.post.data.preview?.images[0].resolutions[0].url;
  return url;
});

const getIconForType = () => {
  if (isImage(props.post)) {
    return 'image';
  } else if (isGallery(props.post)) {
    return 'photo_library';
  } else if (isVideo(props.post)) {
    return 'play_arrow';
  } else return 'link';
};
</script>
