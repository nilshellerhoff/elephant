<template>
  <CommentRenderer v-if="isComment(comment)" :comment="comment" />
  <CommentBase
    v-else-if="showMore"
    :depth="comment.data.depth"
    @click="$emit('loadMoreComments')"
  >
    load {{ comment.data.count }} more comments
  </CommentBase>
</template>

<script setup lang="ts">
import { CommentMore, IComment, isComment } from 'src/types/reddit/base';
import CommentRenderer from 'components/Comments/CommentRenderer.vue';
import CommentBase from 'components/Comments/CommentBase.vue';

interface Props {
  comment: IComment | CommentMore;
  showMore: boolean;
  depth?: number;
}

defineProps<Props>();
defineEmits(['loadMoreComments']);
</script>
