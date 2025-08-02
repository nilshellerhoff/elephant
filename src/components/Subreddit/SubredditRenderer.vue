<template>
  <template v-if="error">
    <InlineError message="An error occured loading posts" @retry="load" />
  </template>

  <q-pull-to-refresh @refresh="loadAll">
    <div>
      <q-list>
        <q-infinite-scroll @load="loadNext" :offset="300" :disable="error">
          <template v-if="settings.viewMode === ViewMode.CARDS">
            <PostListItemCard
              v-for="post in posts"
              :key="post.data.name"
              :post="post"
              :max-lines="3"
            />
          </template>
          <template v-else>
            <PostListItem
              v-for="post in posts"
              :key="post.data.name"
              :post="post"
              :max-lines="3"
            />
          </template>
        </q-infinite-scroll>
        <template v-if="isLoading">
          <PostListItemLoading v-for="i in 5" :key="i" />
        </template>
      </q-list>
    </div>
  </q-pull-to-refresh>
</template>

<script setup lang="ts">
import { SubredditResponse } from 'src/types/reddit/subreddit';
import { Ref, ref, watch } from 'vue';
import PostListItem from 'components/Post/PostListItem.vue';
import { redditGetResponse } from 'src/util/api';
import PostListItemLoading from 'components/Post/PostListItemLoading.vue';
import { Post } from 'src/types/reddit/post';
import InlineError from 'components/InlineError.vue';
import PostListItemCard from 'components/Post/PostListItemCard.vue';
import { useSettingsStore, ViewMode } from 'stores/settings-store';
import { UserResponse } from 'src/types/reddit/User';

interface Props {
  subreddit: string;
  type?: 'subreddit' | 'user';
}

const { subreddit, type = 'subreddit' } = defineProps<Props>();
const settings = useSettingsStore();

const isLoading = ref(false);
const error = ref(false);
const posts: Ref<Post[]> = ref([]);
const after: Ref<string | undefined> = ref(undefined);

const load = (done: () => void) => {
  if (after.value) loadNext(0, done);
  loadAll(done);
};

const getRedditApiUrl = () => {
  let url;
  if (type === 'user') {
    url = `/user/${subreddit}/submitted.json`;
  } else {
    url = `/r/${subreddit}.json`;
  }
  const queryString = after.value ? `?after=${after.value}` : '';
  return `${url}${queryString}`;
};

const loadAll = (done?: () => void) => {
  error.value = false;
  isLoading.value = true;
  redditGetResponse<SubredditResponse | UserResponse>(getRedditApiUrl())
    .then((response) => {
      posts.value = response.data.data.children.filter(
        (entry) => entry.kind === 't3'
      ) as Post[];
      after.value = response.data.data.after;
    })
    .catch(() => {
      error.value = true;
    })
    .finally(() => {
      isLoading.value = false;
      if (done) done();
    });
};

const loadNext = (_: number, done: () => void) => {
  console.log('loadnext');
  if (isLoading.value || !after.value) {
    try {
      done();
    } catch {
      // no empty
    }
    return;
  }
  isLoading.value = true;
  redditGetResponse<SubredditResponse | UserResponse>(getRedditApiUrl())
    .then((response) => {
      const newPosts = response.data.data.children.filter(
        (entry) => entry.kind === 't3'
      ) as Post[];

      posts.value.push(...newPosts);
      after.value = response.data.data.after;
    })
    .catch(() => (error.value = true))
    .finally(() => {
      isLoading.value = false;
      try {
        done();
      } catch {
        // no empty
      }
    });
};

watch(() => subreddit, loadAll, { immediate: true });
</script>
