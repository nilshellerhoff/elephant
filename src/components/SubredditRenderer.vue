<template>
  <q-pull-to-refresh @refresh="load">
    <q-list>
      <q-infinite-scroll @load="loadNext" :offset="300">
        <PostListItem
          v-for="post in posts"
          :key="post.data.name"
          :post="post"
        />
      </q-infinite-scroll>

      <template v-if="isLoading">
        <PostListItemLoading v-for="i in 5" :key="i" />
      </template>
    </q-list>
  </q-pull-to-refresh>
</template>

<script setup lang="ts">
import { SubredditResponse } from 'src/types/reddit/subreddit';
import { Ref, ref, watch } from 'vue';
import { Post } from 'src/types/reddit/base';
import PostListItem from 'components/PostListItem.vue';
import { redditGetResponse } from 'src/util/api';
import PostListItemLoading from 'components/PostListItemLoading.vue';

interface Props {
  subreddit: string;
}

const props = defineProps<Props>();

const isLoading = ref(false);
const posts: Ref<Post[]> = ref([]);
const after: Ref<string | undefined> = ref(undefined);
const load = (done) => {
  isLoading.value = true;
  redditGetResponse<SubredditResponse>(
    `https://reddit.com/r/${props.subreddit}.json`
  )
    .then((response) => {
      posts.value = response.data.data.children;
      after.value = response.data.data.after;
    })
    .finally(() => {
      isLoading.value = false;
      done();
    });
};

const loadNext = (index, done) => {
  console.log('loadnext');
  if (isLoading.value) {
    done();
    return;
  }
  isLoading.value = true;
  redditGetResponse<SubredditResponse>(
    `https://reddit.com/r/${props.subreddit}.json?after=${after.value}`
  )
    .then((response) => {
      posts.value.push(...response.data.data.children);
      after.value = response.data.data.after;
    })
    .finally(() => {
      isLoading.value = false;
      done();
    });
};

watch(() => props.subreddit, load, { immediate: true });
</script>
