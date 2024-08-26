<template>
  <q-item
    clickable
    :style="{ marginLeft: comment.data.depth * 10 + 'px', padding: 0 }"
    @click="isCollapsed = !isCollapsed"
  >
    <q-item-section side>
      <div
        :style="`width: 4px; min-height: 100%; background-color: ${getCommentColor(
          comment.data.depth
        )}`"
      ></div>
    </q-item-section>
    <q-item-section style="padding: 8px 0">
      <template v-if="isComment(comment)">
        <template v-if="!isCollapsed">
          <q-item-label class="username"
            >u/{{ comment.data.author }}</q-item-label
          >
          <q-item-label>
            <CommentContentRenderer :html="comment.data.body_html" />
          </q-item-label>
          <div>
            <q-icon name="arrow_upward" />
            {{ comment.data.score_hidden ? '?' : comment.data.ups }}
          </div>
        </template>
        <template v-else>(expand)</template>
      </template>
      <template v-else> load {{ comment.data.count }} more comments </template>
    </q-item-section>
  </q-item>
  <q-separator />

  <div :style="{ display: isCollapsed ? 'none' : 'block' }">
    <template v-if="isComment(comment)">
      <template
        v-if="
          comment.data.replies && comment.data.replies.data.children.length > 0
        "
      >
        <template
          v-for="reply in comment.data.replies.data.children"
          :key="reply.data.id"
        >
          <CommentRenderer :comment="reply" />
        </template>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { CommentMore, IComment, isComment } from 'src/types/reddit/base';
import CommentContentRenderer from 'components/Comments/CommentContentRenderer.vue';
import { ref } from 'vue';
interface Props {
  comment: IComment | CommentMore;
}

const props = defineProps<Props>();

const isCollapsed = ref(false);

const indentColors = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
];

const getCommentColor = (depth: number) => {
  const colorIndex = depth % indentColors.length;
  return indentColors[colorIndex];
};
</script>

<style>
.username {
  font-size: 12px;
}
</style>
