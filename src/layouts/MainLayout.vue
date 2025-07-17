<template>
  <q-layout view="hHh lpR fFf">
    <HeaderBar type="main" @toggle="toggleLeftDrawer" />
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container style="max-width: 1000px; margin: 0 auto">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <PostPopup
        v-if="!!postPermalink"
        :post-permalink="postPermalink"
        :open="!!postPermalink"
        @back="$router.go(-1)"
      ></PostPopup>
    </q-page-container>
    <FooterBar />
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import FooterBar from 'components/FooterBar.vue';
import HeaderBar from 'components/HeaderBar.vue';
import PostPopup from 'components/PostPopup.vue';

import { useRoute } from 'vue-router';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const route = useRoute();
const postPermalink = computed(() => route.query.post as string | undefined);
</script>

<style>
// Disable Safari pull to refresh
html,
body {
  overscroll-behavior: none;
}
</style>
