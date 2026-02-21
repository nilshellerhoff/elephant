<template>
  <router-link :to="`u/${username}`">
    <span @click.prevent.stop="showPopup" :style="{ color }">
      <template v-if="prefix">u/</template>{{ username }}
    </span>
  </router-link>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar';
import UserPopup from 'components/User/UserPopup.vue';
import BottomPopupSheetContent from 'components/General/BottomPopupSheetContent.vue';

interface Props {
  username: string;
  color?: string;
  prefix?: boolean;
}
const { username, color = '#00796B', prefix = false } = defineProps<Props>();

const showPopup = () => {
  Dialog.create({
    component: BottomPopupSheetContent,
    componentProps: { component: UserPopup, componentProps: { username } },
  });
};
</script>
