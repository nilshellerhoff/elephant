<template>
  <q-layout view="hHh lpR fFf">
    <HeaderBar
      type="popup"
      @toggle="$router.back()"
    />
<!--    <q-drawer show-if-above-->
<!--              v-model="leftDrawerOpen"-->
<!--              side="left"-->
<!--              elevated>-->
<!--      &lt;!&ndash; drawer content &ndash;&gt;-->
<!--    </q-drawer>-->

    <q-page-container>
      <router-view />
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
      }
    };
  }
};
</script>
