import { Dialog } from 'quasar';
import { isImage } from 'src/util/mediaUrl';
import ImageViewerPopupUrl from 'components/Media/ImageViewerPopupUrl.vue';

export const processRedditContent = (el: HTMLElement) => {
  linksNewTab(el);
  imagesMaxWidth(el);
  imageLinksInViewer(el);
};

const linksNewTab = (el: HTMLElement): void => {
  const anchors = el.querySelectorAll('a');
  anchors.forEach((anchor) => {
    anchor.target = '_blank';
    anchor.onclick = (ev) => ev.stopPropagation();
  });
};

const imageLinksInViewer = (el: HTMLElement): void => {
  const anchors = el.querySelectorAll('a');
  anchors.forEach((anchor) => {
    if (isImage(anchor.href)) {
      anchor.addEventListener('click', (ev) => {
        console.log('open image viewer');
        ev.preventDefault();
        ev.stopPropagation();
        Dialog.create({
          component: ImageViewerPopupUrl,
          componentProps: { url: anchor.href },
        });
        return false;
      });
    }
  });
};

const imagesMaxWidth = (el: HTMLElement): void => {
  const images = el.querySelectorAll('img');
  images.forEach((image) => {
    image.removeAttribute('height');
    image.style.maxWidth = '100%';
  });
};
