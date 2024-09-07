<template>
  <b><template v-if="comment.data.controversiality > 0">♰ • </template></b>
  <b> {{ comment.data.score_hidden ? '?' : comment.data.ups }} </b>
  •
  <span> {{ displayTimeAgo(comment.data.created_utc) }}</span>
  <span v-if="comment.data.edited">
    ({{ displayTimeAgo(comment.data.edited) }})
  </span>
</template>

<script setup lang="ts">
import { IComment } from 'src/types/reddit/comment';
import { displayTimeAgo } from 'src/util/time';

interface Props {
  comment: IComment;
}
defineProps<Props>();
</script>
