<template>
  <template v-if="error">
    <InlineError message="An error occured loading posts" @retry="load" />
  </template>

  <q-pull-to-refresh @refresh="loadAll">
    <div>
      <q-toolbar>
        <q-btn flat @click="openSortingSelector" icon="swap_vert">
          {{ sortingMode.label }}
        </q-btn>
        <SubredditFilter
          :subreddit-options="subredditOptions"
          v-model="selectedSubreddits"
        />
      </q-toolbar>
    </div>
    <div>
      <q-list>
        <q-infinite-scroll @load="loadNext" :offset="300" :disable="error">
          <template v-for="post in posts" :key="post.data.name">
            <template v-if="selectedSubreddits[post.data.subreddit]">
              <PostListItemCard
                v-if="settings.viewMode === ViewMode.CARDS"
                :post="post"
                :max-lines="3"
              />
              <PostListItem v-else :post="post" :max-lines="3" />
            </template>
          </template>
        </q-infinite-scroll>
        <template v-if="isLoading">
          <PostListItemLoading v-for="i in 5" :key="i" />
        </template>
        <template v-else>
          <q-btn icon="chevron_down" @click="loadNext">Load more</q-btn>
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
import { useSubredditFilter } from 'src/composables/subredditFilter';
import { unique } from 'src/util/array';
import SubredditFilter from 'components/Subreddit/SubredditFilter.vue';
import { useSubredditSortingSelector } from 'src/composables/subredditSortingSelector';

interface Props {
  subreddit: string;
  type?: 'subreddit' | 'user';
}

const { subreddit, type = 'subreddit' } = defineProps<Props>();
const settings = useSettingsStore();
const { subredditOptions, selectedSubreddits } = useSubredditFilter();
const { sortingMode, openSortingSelector } = useSubredditSortingSelector();

const isLoading = ref(false);
const error = ref(false);
const posts: Ref<Post[]> = ref([]);
const after: Ref<string | undefined> = ref(undefined);

const load = (done: () => void) => {
  if (after.value) loadNext(0, done);
  loadAll(done);
};

const setHeaderFilters = () => {
  subredditOptions.value = unique(
    posts.value.map((post) => post.data.subreddit)
  );
};

const getRedditApiUrl = () => {
  let url;

  const queryParams = new URLSearchParams();
  if (after.value) queryParams.set('after', after.value);
  if (sortingMode.value.t) queryParams.set('t', sortingMode.value.t);

  if (type === 'user') {
    url = `/user/${subreddit}/submitted.json`;
    if (sortingMode.value.mode) queryParams.set('sort', sortingMode.value.mode);
  } else {
    if (sortingMode.value.mode)
      url = `/r/${subreddit}/${sortingMode.value.mode}.json`;
    else url = `/r/${subreddit}.json`;
  }
  return `${url}?${queryParams.toString()}`;
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
      setHeaderFilters();
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
      );

      posts.value.push(...newPosts);
      after.value = response.data.data.after;
    })
    .catch(() => (error.value = true))
    .finally(() => {
      isLoading.value = false;
      setHeaderFilters();
      try {
        done();
      } catch {
        // no empty
      }
    });
};

watch(
  [() => subreddit, () => sortingMode.value.mode, () => sortingMode.value.t],
  () => {
    after.value = undefined;
    loadAll();
  },
  { immediate: true }
);
</script>
