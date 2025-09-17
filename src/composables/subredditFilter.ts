import { computed, Ref, ref, WritableComputedRef } from 'vue';

type SimpleGetterSetterSetHandler<T> = (newVal: T, variable: Ref<T>) => void;

const simpleGetterSetter = <T>(
  variable: Ref<T>,
  handlers: {
    preSet?: SimpleGetterSetterSetHandler<T>[];
    postSet?: SimpleGetterSetterSetHandler<T>[];
  } = {}
): WritableComputedRef<T> =>
  computed({
    get() {
      return variable.value;
    },
    set(newValue: T): void {
      if (handlers.preSet)
        handlers.preSet.forEach((handler) => handler(newValue, variable));
      variable.value = newValue;
      if (handlers.postSet)
        handlers.postSet.forEach((handler) => handler(newValue, variable));
    },
  });

export const useSubredditFilter = () => {
  const subredditOptionsValue = ref<string[]>([]);
  const selectedSubredditsValue = ref<Record<string, boolean | null>>({});

  const addNewSubredditOptionsToSelected = (subreddits: string[]) =>
    subreddits.forEach((subreddit) => {
      if (selectedSubreddits.value[subreddit] === undefined)
        selectedSubreddits.value[subreddit] = true;
    });

  const sortEntries = (_: string[], variable: Ref<string[]>) => {
    variable.value = variable.value.toSorted((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
  };

  const subredditOptions = simpleGetterSetter(subredditOptionsValue, {
    postSet: [addNewSubredditOptionsToSelected, sortEntries],
  });
  const selectedSubreddits = simpleGetterSetter(selectedSubredditsValue);
  return {
    subredditOptions,
    selectedSubreddits,
  };
};
