<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    style="background-color: rgba(0, 0, 0, 0.6)"
    v-touch-swipe.down="onDialogOK"
  >
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      swipeable
      style="background-color: #00000000"
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide
        v-for="(url, idx) in urls"
        :name="idx"
        :key="idx"
        style="padding: 0"
      >
        <q-img
          style="transform: translateY(calc(50vh - 50%))"
          fit="scale-down"
          :src="url"
        />
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';

interface Props {
  urls: string[];
}
defineProps<Props>();
defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const slide = ref(0);
</script>
