import { boot } from 'quasar/wrappers';

const removeLinksFromEl = (el: HTMLElement): void => {
  const anchors = el.querySelectorAll('a');
  anchors.forEach((anchor) => {
    anchor.target = '_blank';
    anchor.onclick = (ev) => ev.stopPropagation();
  });

  const images = el.querySelectorAll('img');
  images.forEach((image) => {
    image.removeAttribute('height');
    image.style.maxWidth = '100%';
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
