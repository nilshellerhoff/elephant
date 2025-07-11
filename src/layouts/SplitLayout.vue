<template>
  <q-layout view="hHh lpR fFf">
    <HeaderBar type="main" @toggle="toggleLeftDrawer" />
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div style="display: flex">
        <div style="flex: 1">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
        <div style="flex: 1">
          <router-view name="post" v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </q-page-container>

    <FooterBar />
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import FooterBar from 'components/FooterBar.vue';
import HeaderBar from 'components/HeaderBar.vue';
export default {
  components: { HeaderBar, FooterBar },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style>
// Disable Safari pull to refresh
html,
body {
  overscroll-behavior: none;
}
</style>
