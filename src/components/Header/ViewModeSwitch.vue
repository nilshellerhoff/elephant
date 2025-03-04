<template>
  <q-btn icon="list_alt" flat round dense>
    <q-menu auto-close>
      <q-list>
        <q-item
          clickable
          v-ripple
          @click="settingsStore.viewMode = ViewMode.LIST"
        >
          <q-item-section side>
            <q-icon name="view_agenda" />
          </q-item-section>
          <q-item-section>List</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="settingsStore.viewMode = ViewMode.CARDS"
        >
          <q-item-section side>
            <q-icon name="image" />
          </q-item-section>
          <q-item-section>Cards</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useSettingsStore, ViewMode } from 'stores/settings-store';

const settingsStore = useSettingsStore();
</script>
