<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    backdrop-filter="brightness(20%)"
  >
    <MediaPopupToolbar @close="close" @reset-zoom="resetZoom" />
    <template v-if="media">
      <component
        ref="mediaComponent"
        :is="media.component"
        v-bind="media.props"
        @close="close"
      />
    </template>
  </q-dialog>
</template>
<script setup lang="ts">
import MediaPopupToolbar from 'components/Media/MediaPopupToolbar.vue';
import { Post } from 'src/types/reddit/post';
import type { Component } from 'vue';
import { computed, onMounted, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import GalleryViewer from 'components/Post/GalleryViewer.vue';
import VideoPlayer from 'components/Media/VideoPlayer/VideoPlayer.vue';
import { useStatusbar } from 'src/composables/statusbar';
import ImageViewer from 'components/Post/ImageViewer.vue';
import { isImage } from 'src/util/media/image';
import { getGalleryUrls, isGallery } from 'src/util/media/gallery';
import { getVideoExtractor, isVideo } from 'src/util/media/video';

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const statusBar = useStatusbar();

interface Props {
  post: Post;
}
const { post } = defineProps<Props>();
defineEmits([...useDialogPluginComponent.emits]);
const mediaComponent = ref();

type MediaComponent = {
  component: Component;
  props: Record<string, unknown>;
};
const media = computed<MediaComponent | undefined>(() => {
  if (isImage(post)) {
    return {
      component: ImageViewer,
      props: { url: post.data.url },
    };
  } else if (isGallery(post)) {
    return {
      component: GalleryViewer,
      props: { urls: getGalleryUrls(post) },
    };
  } else if (isVideo(post)) {
    const extractor = getVideoExtractor(post);
    if (extractor) {
      const { type, url } = extractor.extractor(post);
      return {
        component: VideoPlayer,
        props: { url, type },
      };
    }
  }

  console.warn('Unsupported media in MediaPopupPost.vue');
  return undefined;
});

const resetZoom = () => {
  if (mediaComponent.value && 'reset' in mediaComponent.value) {
    mediaComponent.value.reset();
  }
};

const close = () => {
  statusBar.setDefaultColor();
  onDialogOK();
};

onMounted(() => statusBar.setColor('#000'));
</script>
