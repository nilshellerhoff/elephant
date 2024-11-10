<template>
  <q-input
    v-model="input"
    label="Search for subreddits"
    style="margin: 12px"
  ></q-input>
  <q-list>
    <template v-if="loading">
      <q-item v-for="i in 5" :key="i">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>
        <q-item-section>
          <q-skeleton type="rect" width="40%" />
          <q-skeleton type="text" width="80%" />
        </q-item-section>
      </q-item>
    </template>
    <q-item
      clickable
      v-for="subreddit in subreddits"
      :key="subreddit.data.title"
      :to="subreddit.data.url"
    >
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="getSubredditIcon(subreddit)" alt="" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <FlairBaseRenderer
            v-if="subreddit.data.over18"
            background-color="#cc0000"
            style="margin-right: 4px"
            >NSFW</FlairBaseRenderer
          >
          <b>{{ subreddit.data.display_name_prefixed }}</b>
        </q-item-label>
        <q-item-label lines="1">
          {{ subreddit.data.title }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { usePageTitle } from 'src/composables/pageTitle';
import { watchDebounced } from '@vueuse/core';
import { redditGetResponse } from 'src/util/api';
import { SubredditsSearchResponse } from 'src/types/reddit/search';
import { SubredditAboutResponse } from 'src/types/reddit/subreddit';
import FlairBaseRenderer from 'components/Post/FlairBaseRenderer.vue';

const title = usePageTitle();

title.setTitle('Search');

const input = ref('');
const subreddits: Ref<SubredditAboutResponse[]> = ref([]);
const loading = ref(false);

const getSubredditIcon = (subreddit: SubredditAboutResponse): string => {
  if (subreddit.data.community_icon) return subreddit.data.community_icon;
  return subreddit.data.icon_img;
};

watchDebounced(
  () => input.value,
  (input) => {
    subreddits.value = [];
    if (input) {
      loading.value = true;
      redditGetResponse<SubredditsSearchResponse>(
        `https://www.reddit.com/subreddits/search.json?q=${input}&include_over_18=true`
      )
        .then((response) => {
          subreddits.value = response.data.data.children;
        })
        .finally(() => {
          loading.value = false;
        });
    }
  },
  { debounce: 500 }
);
</script>
