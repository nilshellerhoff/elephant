<template>
  <q-layout view="hHh lpR fFf">
    <HeaderBar type="main" @toggle="toggleLeftDrawer" />
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <SidebarSubredditList />
    </q-drawer>

    <q-page-container>
      <q-splitter v-model="splitterModel">
        <template #before>
          <div
            style="
              overflow-y: scroll;
              overflow-x: hidden;
              height: calc(100vh - 120px);
            "
            class="overflow-auto"
          >
            <div style="flex: 1">
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </div>
          </div>
        </template>
        <template #after>
          <div
            style="flex: 1; max-height: calc(100vh - 120px)"
            class="overflow-auto"
          >
            <router-view name="side" v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </template>
      </q-splitter>
    </q-page-container>

    <FooterBar />
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import FooterBar from 'components/FooterBar.vue';
import HeaderBar from 'components/HeaderBar.vue';
import SidebarSubredditList from 'components/Sidebar/SidebarSubredditList.vue';
export default {
  components: { SidebarSubredditList, HeaderBar, FooterBar },
  setup() {
    const leftDrawerOpen = ref(false);
    const splitterModel = ref(50);

    return {
      leftDrawerOpen,
      splitterModel,
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
