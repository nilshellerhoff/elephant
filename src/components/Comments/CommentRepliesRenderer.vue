<template>
  <template v-for="reply in allReplies" :key="reply.data.id">
    <CommentRenderer v-if="isComment(reply)" :comment="reply" />
    <CommentBase
      v-else-if="moreReplies === undefined && !!reply?.data?.count"
      :depth="reply.data.depth"
      @click="loadMoreComments(reply)"
    >
      load {{ reply.data.count }} more comments
    </CommentBase>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from 'vue';
import { redditGetResponse } from 'src/util/api';
import CommentBase from 'components/Comments/CommentBase.vue';
import CommentRenderer from 'components/Comments/CommentRenderer.vue';
import { reorderCommentTree } from 'src/util/comments';
import { CommentMore, IComment, isComment } from '../../types/reddit/comment';

interface Props {
  replies: (IComment | CommentMore)[];
  linkId: string;
}

const props = defineProps<Props>();

const moreReplies: Ref<IComment[] | undefined> = ref(undefined);
const allReplies = computed(() =>
  moreReplies.value === undefined
    ? props.replies
    : props.replies.concat(moreReplies.value)
);
const loadMoreComments = (reply: CommentMore) => {
  const childrenStr = reply.data.children.join(',');
  const url = `https://reddit.com/api/morechildren.json?api_type=json&children=${childrenStr}&link_id=${props.linkId}`;
  redditGetResponse(url).then((response) => {
    const newComments = response.data.json.data.things;
    moreReplies.value = reorderCommentTree(newComments);
  });
};
</script>
