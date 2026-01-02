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

interface Props {
  subreddit: string;
  iconUrl: string;
}
const { subreddit, iconUrl } = defineProps<Props>();

const { isSubscribed, toggleSubscription } = useListsStore();

const onClickSubscription = () => {
  toggleSubscription({ code: subreddit, iconUrl });
};
</script>
