import { useQuasar } from 'quasar';
import { ref } from 'vue';

const SORTING_OPTIONS: { label: string; mode: string; icon: string }[] = [
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
    label: 'Rising',
    mode: 'rising',
    icon: 'moving',
  },
  {
    label: 'Top',
    mode: 'top',
    icon: 'sym_o_arrow_upward',
  },
  {
    label: 'Controversial',
    mode: 'controversial',
    icon: 'sym_o_swords',
  },
];

const TIME_OPTIONS: { label: string; t: string }[] = [
  {
    label: 'Hour',
    t: 'hour',
  },
  {
    label: 'Today',
    t: 'day',
  },
  {
    label: 'Week',
    t: 'week',
  },
  {
    label: 'Month',
    t: 'month',
  },
  {
    label: 'Year',
    t: 'year',
  },
  {
    label: 'All time',
    t: 'all',
  },
];

export const useSubredditSortingSelector = () => {
  const $q = useQuasar();

  const sortingMode = ref({ label: 'Hot', mode: 'hot', t: undefined });

  const openSortingSelector = () => {
    $q.bottomSheet({
      actions: SORTING_OPTIONS,
    }).onOk(({ label, mode }) => {
      if (mode == 'top' || mode == 'controversial') {
        $q.bottomSheet({
          actions: TIME_OPTIONS,
        }).onOk(({ label: labelTime, t }) => {
          sortingMode.value = { label: `${label} ${labelTime}`, mode, t };
        });
      } else {
        sortingMode.value = { label, mode, t: undefined };
      }
    });
  };

  return {
    sortingMode,
    openSortingSelector,
  };
};
