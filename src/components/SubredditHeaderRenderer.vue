<template>
  <div v-if="data">
    <div class="subreddit-header">
      <!--      <q-btn-->
      <!--        icon="add_alert"-->
      <!--        flat-->
      <!--        round-->
      <!--        color="white"-->
      <!--        style="position: absolute; top: 0; right: 0; z-index: 10"-->
      <!--      />-->
      <q-img
        :src="data.data.banner_background_image"
        height="100px"
        fit="cover"
        alt=""
      />
      <q-avatar
        style="position: absolute; bottom: 10px; left: calc(50% - 24px)"
      >
        <SubredditIconRenderer :subreddit="data" />
      </q-avatar>
    </div>
    <div>
      <div
        style="
          font-size: 24px;
          width: 100%;
          text-align: center;
          font-weight: bold;
        "
      >
        r/{{ subreddit }}
      </div>
      <div style="text-align: center">{{ data.data.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SubredditAboutResponse } from 'src/types/reddit/subreddit';
import { ref, watch } from 'vue';
import { redditGetResponse } from 'src/util/api';
import SubredditIconRenderer from 'components/Subreddit/SubredditIconRenderer.vue';

interface Props {
  subreddit: string;
}

const props = defineProps<Props>();

const data = ref<SubredditAboutResponse | undefined>();

watch(
  () => props.subreddit,
  () => {
    redditGetResponse<SubredditAboutResponse>(
      `https://www.reddit.com/r/${props.subreddit}/about.json`
    )
      .then((response) => (data.value = response.data))
      .catch(() => (data.value = undefined));
  },
  { immediate: true }
);
</script>

<style>
.subreddit-header {
  width: 100%;
  position: relative;
}
</style>
