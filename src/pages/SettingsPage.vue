<template>
  <q-list>
    <q-item>
      <q-item-section>
        <q-item-label overline>Visited posts</q-item-label>
        <q-item-label caption>
          Posts can be marked as visited when clicking on them. You can adjust
          this behavior and delete data about visited posts.
        </q-item-label>
        <q-toggle
          :model-value="settingsStore.markPostsAsVisited"
          @update:model-value="
            (val) => settingsStore.setMarkPostsAsVisited(val)
          "
          label="Mark posts as visited when opening comments"
        />
        <q-toggle
          v-model="settingsStore.markPostsAsVisitedOnMediaClick"
          label="Mark posts as visited when viewing media/link"
        />
        <q-btn @click="deleteVisited" label="Delete visited posts" />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label overline>Stickied comments</q-item-label>
        <q-toggle
          v-model="settingsStore.collapseStickiedCommentsByDefault"
          label="Collapse stickied comments when opening post comments"
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label overline>NSFW</q-item-label>
        <q-toggle
          v-model="settingsStore.blurNsfwThumbnails"
          label="Blur NSFW thumbnails"
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label overline>General</q-item-label>
        <q-btn label="Reload app" @click="reload" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useSettingsStore } from 'stores/settings-store';
import { useQuasar } from 'quasar';
import { useVisitedStore } from 'stores/visited-store';
import { usePageTitle } from 'src/composables/pageTitle';

const settingsStore = useSettingsStore();
const visitedStore = useVisitedStore();
const $q = useQuasar();
const title = usePageTitle();

title.setTitle('Settings');
const reload = () => window.location.reload();

const deleteVisited = async () => {
  $q.dialog({
    title: 'Confirm',
    message:
      'Would you like to delete the stored information about posts visited?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    visitedStore.deleteVisitedInformation();
  });
};
</script>
