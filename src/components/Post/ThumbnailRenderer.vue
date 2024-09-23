<template>
  <div
    :style="{
      width: thumbnailSize,
      height: thumbnailSize,
      position: 'relative',
    }"
  >
    <q-icon
      v-if="isDefaultThumbnail(post.data.thumbnail)"
      name="subject"
      :size="thumbnailSize"
    />
    <q-img
      v-else
      :ratio="1"
      :fit="'cover'"
      :src="post.data.thumbnail"
      @click.stop="$emit('openMedia', post)"
    />
    <div
      v-if="!isDefaultThumbnail(post.data.thumbnail)"
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

interface Props {
  post: Post;
}
const props = defineProps<Props>();
defineEmits<{
  openMedia: [post: Post];
}>();

const thumbnailSize = '70px';

const isDefaultThumbnail = (thumbnail: string) => {
  return thumbnail == 'self' || thumbnail == 'default' || thumbnail == 'image';
};

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
