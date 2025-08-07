<template>
  <span @click.stop="showPopup" :style="{ color }">
    {{ username }}
  </span>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar';
import UserPopup from 'components/User/UserPopup.vue';
import BottomPopupSheetContent from 'components/General/BottomPopupSheetContent.vue';

interface Props {
  username: string;
  color?: string;
}
const { username } = defineProps<Props>();

const showPopup = () => {
  Dialog.create({
    component: BottomPopupSheetContent,
    componentProps: { component: UserPopup, componentProps: { username } },
  });
};
</script>
