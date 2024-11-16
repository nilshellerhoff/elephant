<template>
  <q-header elevated class="header">
    <q-toolbar>
      <!--      <q-btn dense flat round :icon="toggleIcon" @click="$emit('toggle')" />-->

      <q-toolbar-title>
        {{ pageTitle.title.value }}
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePageTitle } from 'src/composables/pageTitle';

const pageTitle = usePageTitle();

interface Props {
  type: 'main' | 'popup';
}
const props = defineProps<Props>();
defineEmits(['toggle']);

// const toggleIcon = computed(() =>
//   props.type == 'popup' ? 'arrow_back' : 'menu'
// );
</script>

<style lang="scss">
.header {
  //background-color: rgba($primary, 0.6);
  background: linear-gradient(
    $primary 0%,
    $primary 20%,
    rgba($primary, 0.6) 100%
  );
  backdrop-filter: blur(20px);
}
</style>
