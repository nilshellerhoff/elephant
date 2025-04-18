<template>
  <q-input
    v-model="input"
    label="Search for subreddits"
    clearable
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
          <SubredditIconRenderer :subreddit="subreddit" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <NsfwFlair v-if="subreddit.data.over18" style="margin-right: 4px" />
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
import SubredditIconRenderer from 'components/Subreddit/SubredditIconRenderer.vue';
import NsfwFlair from 'components/Flair/NsfwFlair.vue';

const title = usePageTitle();

title.setTitle('Search');

const input = ref('');
const subreddits: Ref<SubredditAboutResponse[]> = ref([]);
const loading = ref(false);

watchDebounced(
  () => input.value,
  (input) => {
    subreddits.value = [];
    if (input) {
      loading.value = true;
      redditGetResponse<SubredditsSearchResponse>(
        `/subreddits/search.json?q=${input}&include_over_18=true`
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
