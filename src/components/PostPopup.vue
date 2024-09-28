<template>
  <q-dialog
    :model-value="true"
    persistent
    maximized
    style="margin-bottom: 200px; overflow-wrap: break-word; overflow: hidden"
  >
    <q-layout view="hHh lpR fFf">
      <HeaderBar type="popup" @toggle="$emit('back')" />
      <FooterBar />

      <q-page-container style="background-color: #fff; min-height: 100%">
        <template v-if="isLoading">
          <PostListItemLoading />
        </template>

        <PostListItem v-if="post" :post="post" />

        <CommentContentRenderer
          style="padding: 4px"
          :html="postData?.selftext_html ?? ''"
        />

        <div>
          <q-btn
            color="primary"
            icon="open_in_new"
            label="Reddit"
            style="margin: 10px; width: 120px"
            :href="'https://reddit.com' + postData?.permalink"
            target="_blank"
          />
          <q-btn
            v-if="postData?.url"
            color="primary"
            icon="link"
            label="Link"
            style="margin: 10px; width: 120px; float: right"
            :href="postData?.url"
            target="_blank"
          />
        </div>
        <!-- Comments -->
        <q-list>
          <CommentRepliesRenderer
            v-if="postData && comments"
            :link-id="postData.name"
            :replies="comments"
          />
        </q-list>

        <!--        <q-virtual-scroll-->
        <!--          style="max-height: 300px"-->
        <!--          :items="comments"-->
        <!--          separator-->
        <!--          v-slot="{ item, index }"-->
        <!--        >-->
        <!--          <q-item :key="index" dense>-->
        <!--            <q-item-section>-->
        <!--              <q-item-label>-->
        <!--                {{ item.data.body }}-->
        <!--              </q-item-label>-->
        <!--            </q-item-section>-->
        <!--          </q-item>-->
        <!--        </q-virtual-scroll>-->
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import HeaderBar from 'components/HeaderBar.vue';
import FooterBar from 'components/FooterBar.vue';
import { computed, ComputedRef, ref, Ref, watch } from 'vue';
import { redditGetResponse } from 'src/util/api';
import { Post, PostData, PostResponse } from 'src/types/reddit/post';
import PostListItemLoading from 'components/PostListItemLoading.vue';
import CommentRepliesRenderer from 'components/Comments/CommentRepliesRenderer.vue';
import { IComment } from '../types/reddit/comment';
import CommentContentRenderer from 'components/RedditContentRenderer.vue';
import PostListItem from 'components/PostListItem.vue';
import { useVisitedStore } from 'stores/visited-store';

interface Props {
  open: boolean;
  postPermalink: string | undefined;
}
const props = defineProps<Props>();
defineEmits(['back']);

const visitedStore = useVisitedStore();

const isLoading = ref(false);

const data: Ref<PostResponse | null> = ref(null);
const post: ComputedRef<Post | undefined> = computed(
  () => data.value?.[0].data.children[0]
);
const postData: ComputedRef<PostData | undefined> = computed(
  () => post.value?.data
);
const comments: ComputedRef<IComment[] | undefined> = computed(
  () => data.value?.[1].data.children
);

watch(
  [() => props.postPermalink, () => props.open],
  () => {
    if (props.open) {
      if (props.postPermalink) {
        isLoading.value = true;
        redditGetResponse<PostResponse>(
          `https://www.reddit.com/${props.postPermalink}.json`
        )
          .then((response) => {
            data.value = response.data;
            if (postData.value) visitedStore.markVisited(postData.value.name);
          })
          .finally(() => (isLoading.value = false));
      }
    } else {
      data.value = null;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.post-background {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
</style>
