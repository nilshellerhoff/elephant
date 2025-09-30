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

            <q-item clickable @click="selectedTab = 'username'">
              <q-item-section>Filter by username</q-item-section>
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

            <q-input v-model="searchValue" clearable label="Search">
              <template #prepend>
                <q-icon name="search" />
              </template>
              <!--              <template #after>-->
              <!--                <q-btn flat round icon="sort">-->
              <!--                  <q-menu>-->
              <!--                    <q-list>-->
              <!--                      <q-item clickable v-close-popup>-->
              <!--                        <q-item-section>Alphabetically</q-item-section>-->
              <!--                      </q-item>-->
              <!--                      <q-item clickable v-close-popup>-->
              <!--                        <q-item-section>Number of posts</q-item-section>-->
              <!--                      </q-item>-->
              <!--                    </q-list>-->
              <!--                  </q-menu>-->
              <!--                </q-btn>-->
              <!--              </template>-->
            </q-input>
            <q-item
              v-for="subreddit in filteredSubredditOptions"
              :key="subreddit"
            >
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

        <q-tab-panel name="username">
          <q-list>
            <q-item clickable @click="selectedTab = 'root'">
              <q-item-section side>
                <q-icon name="chevron_left" />
              </q-item-section>
              <q-item-section>Back</q-item-section>
            </q-item>

            <q-input v-model="usernameSearchValue" clearable label="Search">
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-item v-for="username in filteredUsernameOptions" :key="username">
              <q-item-section side>
                <q-checkbox
                  :name="username"
                  :label="username"
                  v-model="selectedUsernames[username]"
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
import { computed, ref } from 'vue';

interface Props {
  subredditOptions: string[];
  usernameOptions: string[];
}
const { subredditOptions, usernameOptions } = defineProps<Props>();
const selectedSubreddits = defineModel<Record<string, boolean | null>>(
  'subreddits',
  {
    required: true,
  }
);
const selectedUsernames = defineModel<Record<string, boolean | null>>(
  'usernames',
  { required: true }
);

const isDialogOpen = ref(false);
const selectedTab = ref('root');
const searchValue = ref('');
const usernameSearchValue = ref('');

const filteredSubredditOptions = computed(() => {
  if (searchValue.value)
    return subredditOptions.filter((s) =>
      s.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  return subredditOptions;
});

const filteredUsernameOptions = computed(() => {
  if (usernameSearchValue.value)
    return usernameOptions.filter((u) =>
      u.toLowerCase().includes(usernameSearchValue.value.toLowerCase())
    );
  return usernameOptions;
});
</script>
