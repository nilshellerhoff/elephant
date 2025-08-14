<template>
  <router-link :to="`r/${subreddit}`">
    <span @click.prevent.stop="showPopup"> r/{{ subreddit }} </span>
  </router-link>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar';
import BottomPopupSheetContent from 'components/General/BottomPopupSheetContent.vue';
import SubredditLinkPopup from 'components/Subreddit/SubredditLinkPopup.vue';

interface Props {
  subreddit: string;
}

const { subreddit } = defineProps<Props>();

const showPopup = () => {
  Dialog.create({
    component: BottomPopupSheetContent,
    componentProps: {
      component: SubredditLinkPopup,
      componentProps: { subreddit },
    },
  });
};
</script>

<style scoped>
a {
  font-size: 14px;
  color: var(--q-secondary);
  text-decoration: none;
}
</style>
