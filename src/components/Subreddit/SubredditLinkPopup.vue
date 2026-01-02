<template>
  <div style="margin: 50px 10px 10px 10px">
    <template v-if="subredditInfo">
      <q-avatar style="position: relative; left: calc(50% - 24px)">
        <SubredditIconRenderer :icon-url="subredditInfo.iconUrl" />
      </q-avatar>
    </template>
    <div class="row q-ma-md">
      <div class="col-1"><!-- placeholder --></div>
      <div class="col-10">
        <div class="text-center text-h5">r/{{ subreddit }}</div>
      </div>
      <div class="col-1">
        <SubredditSubscribeBellIcon
          v-if="subredditInfo"
          :subreddit="subreddit"
          :icon-url="subredditInfo.iconUrl"
        />
      </div>
    </div>

    <router-link :to="{ name: 'subreddit', params: { subreddit: subreddit } }">
      <q-btn style="width: 100%" rounded color="primary">
        Go to subreddit
      </q-btn>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SubredditIconRenderer from 'components/Subreddit/SubredditIconRenderer.vue';
import SubredditSubscribeBellIcon from 'components/Subreddit/SubredditSubscribeBellIcon.vue';
import { SubredditInfo } from 'src/types/custom';
import { useContentStore } from 'stores/content-store';

interface Props {
  subreddit: string;
}
const { subreddit } = defineProps<Props>();
const { getSubredditInformation } = useContentStore();
const subredditInfo = ref<SubredditInfo>();

watch(
  () => subreddit,
  (code) => {
    getSubredditInformation(code).then((info) => (subredditInfo.value = info));
  },
  { immediate: true }
);
</script>
