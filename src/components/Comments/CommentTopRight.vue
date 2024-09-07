<template>
  <template v-if="comment.data.controversiality > 0">🕇 • </template>
  <b> {{ comment.data.score_hidden ? '?' : comment.data.ups }} </b>

  •
  {{ displayTimeAgo(comment.data.created_utc) }}
</template>

<script setup lang="ts">
import { IComment } from '../../types/reddit/comment';
import { displayTimeAgo } from 'src/util/time';

interface Props {
  comment: IComment;
}
defineProps<Props>();
</script>
