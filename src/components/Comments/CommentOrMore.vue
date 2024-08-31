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
import CommentRenderer from 'components/Comments/CommentRenderer.vue';
import CommentBase from 'components/Comments/CommentBase.vue';
import { CommentMore, IComment, isComment } from '../../types/reddit/comment';

interface Props {
  comment: IComment | CommentMore;
  showMore: boolean;
  depth?: number;
}

defineProps<Props>();
defineEmits(['loadMoreComments']);
</script>
