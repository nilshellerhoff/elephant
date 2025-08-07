<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    position="bottom"
    class="bottom-dialog"
  >
    <q-card
      :style="{
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        width,
      }"
    >
      <div style="width: 100%">
        <q-btn
          flat
          round
          color="primary"
          icon="close"
          @click="onDialogCancel"
          style="float: right; margin: 10px 10px 0 0"
        />
      </div>
      <div style="width: 100%">
        <component :is="component" v-bind="componentProps" />
      </div>
      <!-- spacer for iOS touchbar -->
      <div style="height: 20px"></div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { computed } from 'vue';
import { useDialogPluginComponent } from 'quasar';

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();

interface Props {
  component: Component;
  componentProps: Record<string, unknown>;
}

defineProps<Props>();
defineEmits([...useDialogPluginComponent.emits]);

const width = computed(() => (window.innerWidth > 500 ? '500px' : '100vw'));
</script>

<style scoped></style>
