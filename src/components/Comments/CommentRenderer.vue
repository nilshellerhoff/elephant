<template>
  <CommentBase :depth="comment.data.depth" @click="isCollapsed = !isCollapsed">
    <q-item-label class="username">
      <q-icon
        v-if="comment.data.stickied"
        name="push_pin"
        style="margin-right: 4px; color: #007a25"
      />
      <span :style="`color: ${getUsernameColor()};`">
        u/{{ comment.data.author }}</span
      >
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
import CommentContentRenderer from 'components/RedditContentRenderer.vue';
import CommentTopRight from 'components/Comments/CommentTopRight.vue';
import { ref } from 'vue';
import CommentBase from 'components/Comments/CommentBase.vue';
import CommentRepliesRenderer from 'components/Comments/CommentRepliesRenderer.vue';
import { IComment, isComment } from 'src/types/reddit/comment';
import { useSettingsStore } from 'stores/settings-store';
interface Props {
  comment: IComment;
}

const props = defineProps<Props>();
const settingsStore = useSettingsStore();

const isCollapsed = ref(false);

if (
  settingsStore.collapseStickiedCommentsByDefault &&
  props.comment.data.stickied
)
  isCollapsed.value = true;

const getUsernameColor = () => {
  if (props.comment.data.stickied) return '#007a25';
  if (props.comment.data.is_submitter) return '#526efb';
  return 'inherit';
};
</script>

<style>
.username {
  font-size: 12px;
}
</style>
