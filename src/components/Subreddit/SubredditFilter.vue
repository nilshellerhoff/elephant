<template>
  <q-btn flat icon="filter_alt" @click="isDialogOpen = true">Filter</q-btn>
  <q-dialog v-model="isDialogOpen">
    <q-card
      style="max-height: 80vh; height: 600px; max-width: 80vw; width: 600px"
    >
      <q-tab-panels :model-value="selectedTab" animated>
        <q-tab-panel name="root">
          <q-list>
            <q-item clickable @click="selectedTab = 'subreddit'">
              <q-item-section>Filter by subreddit</q-item-section>
              <q-item-section avatar>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="subreddit">
          <q-list>
            <q-item clickable @click="selectedTab = 'root'">
              <q-item-section side>
                <q-icon name="chevron_left" />
              </q-item-section>
              <q-item-section>Back</q-item-section>
            </q-item>

            <q-item v-for="subreddit in subredditOptions" :key="subreddit">
              <q-item-section side>
                <q-checkbox
                  :name="subreddit"
                  :label="subreddit"
                  v-model="selectedSubreddits[subreddit]"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  subredditOptions: string[];
}
defineProps<Props>();
const selectedSubreddits = defineModel<Record<string, boolean | null>>({
  required: true,
});

const isDialogOpen = ref(false);
const selectedTab = ref('root');
</script>
