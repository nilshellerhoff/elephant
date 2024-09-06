import { boot } from 'quasar/wrappers';

const removeLinksFromEl = (el: HTMLElement): void => {
  const anchors = el.querySelectorAll('a');
  anchors.forEach((anchor) => {
    anchor.target = '_blank';
  });
};

export default boot(({ app }) => {
  app.directive('links-in-new-window', {
    mounted: function (el) {
      removeLinksFromEl(el);
    },
    updated: function (el) {
      removeLinksFromEl(el);
    },
  });
});
