<template>
  <q-footer elevated class="footer">
    <q-tabs switch-indicator>
      <q-route-tab name="home" icon="home" to="/" class="q-pb-lg q-pt-sm" />
      <q-route-tab
        name="popular"
        icon="trending_up"
        to="/popular"
        class="q-pb-lg q-pt-sm"
      />
      <q-route-tab
        name="search"
        icon="search"
        to="/search"
        class="q-pb-lg q-pt-sm"
      />
      <q-route-tab
        name="settings"
        icon="settings"
        to="/settings"
        class="q-pb-lg q-pt-sm"
      />
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.footer {
  background-color: rgba($primary, 0.6);
  backdrop-filter: blur(20px);
}
</style>
