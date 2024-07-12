<template></template>

<script setup lang="ts">
import { IComment } from 'src/types/reddit/base';
import { Ref, ref, watch } from 'vue';

interface Props {
  comments: IComment[];
}

const props = defineProps<Props>();

const flattenedComments: Ref<IComment[]> = ref([]);

const getAllChildren = (comment: IComment): IComment[] => {
  let subChildren: IComment[] = [];
  if (comment.data.replies != '') {
    subChildren.push(
      ...comment.data.replies.data.children
        .map((comment) => getAllChildren(comment))
        .flat()
    );
  }
  return subChildren;
};

watch(
  () => props.comments,
  (newComments) => {
    flattenedComments.value = [];
    newComments.forEach((comment) => {
      flattenedComments.value.push(comment);
      flattenedComments.value.push(...getAllChildren(comment));
    });
  }
);
</script>
