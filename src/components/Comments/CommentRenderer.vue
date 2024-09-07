<template>
  <CommentBase :depth="comment.data.depth" @click="isCollapsed = !isCollapsed">
    <q-item-label class="username">
      <span>u/{{ comment.data.author }}</span>
      <span style="float: right">
        <CommentTopRight :comment="comment" />
      </span>
    </q-item-label>
    <q-item-label v-if="!isCollapsed">
      <CommentContentRenderer :html="comment.data.body_html" />
    </q-item-label>
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
import CommentTopRight from 'components/Comments/CommentTopRight.vue';
import { ref } from 'vue';
import CommentBase from 'components/Comments/CommentBase.vue';
import CommentRepliesRenderer from 'components/Comments/CommentRepliesRenderer.vue';
import { IComment, isComment } from 'src/types/reddit/comment';
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
