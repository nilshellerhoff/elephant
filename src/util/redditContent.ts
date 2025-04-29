import { Dialog } from 'quasar';
import ImageViewer from 'components/Post/ImageViewer.vue';
import {
  getGalleryUrls,
  getImageExtractor,
  isGallery,
  isImage,
} from 'src/util/mediaUrl';
import GalleryViewer from 'components/Post/GalleryViewer.vue';

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
    const isImageLink = isImage(anchor.href);
    const isGalleryLink = isGallery(anchor.href);
    if (isImageLink || isGalleryLink) {
      const extractor = isGalleryLink
        ? getGalleryUrls(anchor.href)
        : getImageExtractor(anchor.href);
      if (!extractor) return;

      anchor.addEventListener('click', (ev) => {
        console.log('open image viewer');
        ev.preventDefault();
        ev.stopPropagation();
        extractor.extractor(anchor.href).then((res) => {
          if (!res) return;
          Dialog.create({
            component: isGalleryLink ? GalleryViewer : ImageViewer,
            componentProps: { url: res },
          });
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
