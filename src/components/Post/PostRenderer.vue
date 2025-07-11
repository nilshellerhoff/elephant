<template>
  <div>
    <template v-if="isLoading">
      <PostListItemLoading />
    </template>

    <PostListItem v-if="post" :post="post" :ignore-visited="true" />

    <RedditContentRenderer
      style="padding: 4px"
      :html="postData?.selftext_html ?? ''"
    />

    <div>
      <q-btn
        color="primary"
        icon="open_in_new"
        label="Reddit"
        style="margin: 10px; width: 120px"
        :href="'https://reddit.com/' + postData?.permalink"
        target="_blank"
      />
      <q-btn icon="share" flat @click="sharePost" />
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

    <div style="margin: 12px">
      <q-btn
        icon="swap_vert"
        :label="sortingMode.label"
        size="md"
        dense
        flat
        style="padding-right: 10px"
        @click="openSortingSelector"
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
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref, Ref, watch } from 'vue';
import { redditGetResponse } from 'src/util/api';
import { Post, PostData, PostResponse } from 'src/types/reddit/post';
import PostListItemLoading from 'components/Post/PostListItemLoading.vue';
import CommentRepliesRenderer from 'components/Comments/CommentRepliesRenderer.vue';
import { IComment } from '../types/reddit/comment';
import RedditContentRenderer from 'components/RedditContentRenderer.vue';
import PostListItem from 'components/Post/PostListItem.vue';
import { useVisitedStore } from 'stores/visited-store';
import { useQuasar } from 'quasar';

const $q = useQuasar();

interface Props {
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

const sortingMode = ref({ label: 'Best', mode: 'confidence' });

const openSortingSelector = () => {
  $q.bottomSheet({
    actions: [
      {
        label: 'Best',
        mode: 'confidence',
        icon: 'sym_o_rocket',
      },
      {
        label: 'Hot',
        mode: 'hot',
        icon: 'local_fire_department',
      },
      {
        label: 'New',
        mode: 'new',
        icon: 'sym_o_electric_bolt',
      },
      {
        label: 'Top',
        mode: 'top',
        icon: 'sym_o_arrow_upward',
      },
      {
        label: 'QA',
        mode: 'qa',
        icon: 'question_answer',
      },
      {
        label: 'Controversial',
        mode: 'controversial',
        icon: 'sym_o_swords',
      },
    ],
  }).onOk(({ label, mode }) => {
    sortingMode.value = { label, mode };
  });
};

const sharePost = () => {
  if (postData.value) {
    const shareUrl = window.location.origin + postData.value.permalink;
    navigator.share({
      title: postData.value.title,
      url: shareUrl,
    });
  }
};

watch(
  [() => props.postPermalink, () => sortingMode.value],
  () => {
    if (props.postPermalink) {
      isLoading.value = true;
      data.value = null;
      redditGetResponse<PostResponse>(
        `${props.postPermalink}.json?sort=${sortingMode.value.mode}`
      )
        .then((response) => {
          data.value = response.data;
          if (postData.value) visitedStore.markVisited(postData.value.name);
        })
        .finally(() => (isLoading.value = false));
    }
  },
  { immediate: true }
);
</script>
