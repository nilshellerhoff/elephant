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
  const usernameOptionsValue = ref<string[]>([]);
  const selectedUsernamesValue = ref<Record<string, boolean | null>>({});

  const addNewOptionsToValue =
    (selectedOptions: Ref<Record<string, boolean | null>>) =>
    (newOptions: string[]) =>
      newOptions.forEach((option) => {
        if (selectedOptions.value[option] === undefined)
          selectedOptions.value[option] = true;
      });

  const sortEntries = (_: string[], variable: Ref<string[]>) => {
    variable.value = variable.value.toSorted((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
  };

  const subredditOptions = simpleGetterSetter(subredditOptionsValue, {
    postSet: [addNewOptionsToValue(selectedSubredditsValue), sortEntries],
  });
  const selectedSubreddits = simpleGetterSetter(selectedSubredditsValue);

  const usernameOptions = simpleGetterSetter(usernameOptionsValue, {
    postSet: [addNewOptionsToValue(selectedUsernamesValue), sortEntries],
  });
  const selectedUsernames = simpleGetterSetter(selectedUsernamesValue);

  return {
    subredditOptions,
    selectedSubreddits,
    usernameOptions,
    selectedUsernames,
  };
};
