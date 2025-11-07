<template>
  <q-btn
    :icon="isSubscribed(subreddit) ? 'notifications_active' : 'o_add_alert'"
    flat
    round
    color="white"
    style="background-color: #0003"
    @click="onClickSubscription"
  />
</template>
<script setup lang="ts">
import { useListsStore } from 'stores/lists-store';
import { getSubredditIcon } from 'src/util/subreddit';
import { SubredditAboutResponse } from 'src/types/reddit/subreddit';

interface Props {
  subreddit: string;
  subredditData: SubredditAboutResponse;
}
const { subreddit, subredditData } = defineProps<Props>();

const { isSubscribed, toggleSubscription } = useListsStore();

const onClickSubscription = () => {
  if (!subredditData) return;

  const icon = getSubredditIcon(subredditData);
  toggleSubscription({ code: subreddit, iconUrl: icon });
};
</script>
