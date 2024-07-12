<template>
  <CommentRenderer v-if="isComment(comment)" :comment="comment" />
  <template v-else> more </template>
</template>

<script setup lang="ts">
import { CommentMore, IComment, isComment } from 'src/types/reddit/base';
import CommentRenderer from 'components/Comments/CommentRenderer.vue';

interface Props {
  comment: IComment | CommentMore;
}

const props = defineProps<Props>();
</script>
