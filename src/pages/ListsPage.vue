<template>
  <q-list>
    <div
      v-if="listsStore.subscriptions.length == 0"
      class="text-body1 text-center q-my-lg"
    >
      No subscriptions. Add them by browsing subreddits and clicking on the
      subscribe icon
    </div>
    <q-item
      v-for="subscription in listsStore.subscriptions"
      :key="subscription.code"
    >
      <q-item-section avatar>
        <q-avatar>
          <q-img :src="subscription.iconUrl" alt="" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <b>r/{{ subscription.code }}</b>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn flat icon="delete" @click="unsubscribe(subscription.code)" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
import { useListsStore } from 'stores/lists-store';
import { useQuasar } from 'quasar';
import { usePageTitle } from 'src/composables/pageTitle';

const listsStore = useListsStore();
const $q = useQuasar();
const title = usePageTitle();

title.setTitle('Subscriptions');

const unsubscribe = (code: string) => {
  $q.dialog({
    title: 'Confirm',
    message: `Unsubscribe from r/${code}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    listsStore.unsubscribe(code);
  });
};
</script>
