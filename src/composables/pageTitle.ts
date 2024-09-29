import { ref } from 'vue';

const pageTitle = ref('Elephant');

export const usePageTitle = () => {
  const setTitle = (newTitle: string): void => {
    pageTitle.value = newTitle;
  };

  return {
    title: pageTitle,
    setTitle,
  };
};
