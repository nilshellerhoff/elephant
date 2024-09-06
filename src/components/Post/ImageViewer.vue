<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" maximized auto-close>
    <q-img fit="scale-down" :src="url" />
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

interface Props {
  url: string;
}

defineProps<Props>();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();
</script>
