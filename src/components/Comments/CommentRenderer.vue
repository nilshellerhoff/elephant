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
        <template
          v-for="reply in comment.data.replies.data.children.concat(
            moreReplies
          )"
          :key="reply.data.id"
        >
          <CommentRenderer v-if="isComment(reply)" :comment="reply" />
          <CommentBase
            v-else-if="moreReplies.length == 0 && reply.data.count > 0"
            :depth="comment.data.depth + 1"
            @click="loadMoreComments(reply)"
          >
            load {{ reply.data.count }} more comments
          </CommentBase>
        </template>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { CommentMore, IComment, isComment } from 'src/types/reddit/base';
import CommentContentRenderer from 'components/Comments/CommentContentRenderer.vue';
import { ref } from 'vue';
import { redditGetResponse } from 'src/util/api';
import CommentBase from 'components/Comments/CommentBase.vue';
interface Props {
  comment: IComment;
}

const props = defineProps<Props>();
const moreReplies = ref([]);
const isCollapsed = ref(false);

const loadMoreComments = (reply: CommentMore) => {
  const childrenStr = reply.data.children.join(',');
  const url = `https://reddit.com/api/morechildren.json?api_type=json&children=${childrenStr}&link_id=${props.comment.data.link_id}`;
  redditGetResponse(url).then((response) => {
    moreReplies.value = response.data.json.data.things;
  });
};
</script>

<style>
.username {
  font-size: 12px;
}
</style>
