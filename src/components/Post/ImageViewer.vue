<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    style="background-color: rgba(0, 0, 0, 0.6)"
    v-touch-swipe.down="onDialogOK"
  >
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

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
</script>
