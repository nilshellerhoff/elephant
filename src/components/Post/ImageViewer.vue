<template>
  <q-dialog :model-value="open" maximized auto-close>
    <q-img fit="scale-down" :src="url" />
  </q-dialog>
</template>

<script setup lang="ts">
interface Props {
  open: boolean;
  url: string;
}

defineProps<Props>();
</script>
