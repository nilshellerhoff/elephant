<template>
  <CommentBase :depth="comment.data.depth" @click="isCollapsed = !isCollapsed">
    <template v-if="!isCollapsed">
      <q-item-label class="username">u/{{ comment.data.author }}</q-item-label>
      <q-item-label>
        <CommentContentRenderer :html="comment.data.body_html" />
      </q-item-label>
      <div>
        <q-icon name="arrow_upward" />
        {{ comment.data.score_hidden ? '?' : comment.data.ups }}
      </div>
    </template>
    <template v-else>(expand)</template>
  </CommentBase>

  <div :style="{ display: isCollapsed ? 'none' : 'block' }">
    <template v-if="isComment(comment)">
      <template
        v-if="
          comment.data.replies && comment.data.replies.data.children.length > 0
        "
      >
        <CommentRepliesRenderer
          :replies="comment.data.replies.data.children"
          :link-id="comment.data.link_id"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import CommentContentRenderer from 'components/Comments/CommentContentRenderer.vue';
import { ref } from 'vue';
import CommentBase from 'components/Comments/CommentBase.vue';
import CommentRepliesRenderer from 'components/Comments/CommentRepliesRenderer.vue';
import { IComment, isComment } from '../../types/reddit/comment';
interface Props {
  comment: IComment;
}

defineProps<Props>();
const isCollapsed = ref(false);
</script>

<style>
.username {
  font-size: 12px;
}
</style>
