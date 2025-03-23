<template>
  <q-btn icon="more_vert" flat round dense>
    <q-popup-proxy>
      <q-card style="min-width: 300px">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label overline>Theming</q-item-label>
              <q-item-label>
                <DarkModeSetting />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>View mode</q-item-label>
              <q-item-label>
                <ViewModeSetting />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/settings">
            <q-item-section> All settings </q-item-section>
            <q-item-section side>
              <q-icon name="arrow_right" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import DarkModeSetting from 'components/Settings/DarkModeSetting.vue';
import ViewModeSetting from 'components/Settings/ViewModeSetting.vue';
</script>
