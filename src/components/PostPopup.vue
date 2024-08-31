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

        <q-item v-if="postData">
          <q-item-section thumbnail>
            <q-img
              style="width: 60px; margin: 5px"
              :ratio="1"
              :src="postData.thumbnail"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label :to="`/r/${postData.subreddit}`">
              r/{{ postData.subreddit }}
            </q-item-label>
            <q-item-label>
              <b>{{ postData.title }}</b>
            </q-item-label>
            <q-item-label>
              {{ postData.ups }} ({{ postData.upvote_ratio * 100 }}%) •
              {{ postData.num_comments }} comments
            </q-item-label>
          </q-item-section>
        </q-item>

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
            :link-id="postData?.name"
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
import { PostData, PostResponse } from 'src/types/reddit/post';
import PostListItemLoading from 'components/PostListItemLoading.vue';
import CommentRepliesRenderer from 'components/Comments/CommentRepliesRenderer.vue';
import { IComment } from '../types/reddit/comment';

interface Props {
  open: boolean;
  postPermalink: string | undefined;
}
const props = defineProps<Props>();
defineEmits(['back']);

const isLoading = ref(false);

const data: Ref<PostResponse | null> = ref(null);
const postData: ComputedRef<PostData | undefined> = computed(
  () => data.value?.[0].data.children[0].data
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
          `https://reddit.com/${props.postPermalink}.json`
        )
          .then((response) => {
            data.value = response.data;
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
