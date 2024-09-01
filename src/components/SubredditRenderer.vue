<template>
  <template v-if="error">
    <InlineError message="An error occured loading posts" @retry="load" />
  </template>

  <q-pull-to-refresh @refresh="loadAll">
    <q-list>
      <q-infinite-scroll @load="loadNext" :offset="300" :disable="error">
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
import PostListItem from 'components/PostListItem.vue';
import { redditGetResponse } from 'src/util/api';
import PostListItemLoading from 'components/PostListItemLoading.vue';
import { Post } from '../types/reddit/post';
import InlineError from 'components/InlineError.vue';

interface Props {
  subreddit: string;
}

const props = defineProps<Props>();

const isLoading = ref(false);
const error = ref(false);
const posts: Ref<Post[]> = ref([]);
const after: Ref<string | undefined> = ref(undefined);

const load = (...args) => {
  if (after.value) loadNext(...args);
  loadAll(...args);
};

const loadAll = (done) => {
  error.value = false;
  isLoading.value = true;
  redditGetResponse<SubredditResponse>(
    `https://reddit.com/r/${props.subreddit}.json`
  )
    .then((response) => {
      posts.value = response.data.data.children;
      after.value = response.data.data.after;
    })
    .catch(() => {
      error.value = true;
    })
    .finally(() => {
      isLoading.value = false;
      done();
    });
};

const loadNext = (index, done) => {
  console.log('loadnext');
  if (isLoading.value || !after.value) {
    try {
      done();
    } catch {}
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
    .catch(() => (error.value = true))
    .finally(() => {
      isLoading.value = false;
      try {
        done();
      } catch {}
    });
};

watch(() => props.subreddit, loadAll, { immediate: true });
</script>
