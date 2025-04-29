import { Post } from 'src/types/reddit/post';
import { imgurAlbumExtractor } from 'src/util/media/extractors';

export const urlTest = (expression: RegExp) => (url: string) =>
  expression.test(url);
export const imgurImageTest = (url: string) => {
  if (url.includes('.gifv')) return false;
  return urlTest(/i.imgur.com/)(url);
};

const urlExtractor = (url: string) => {
  console.log(url);
  return Promise.resolve(url);
};

// Images
export const IMAGE_EXTRACTORS_URL: {
  test: (url: string) => boolean;
  extractor: (url: string) => Promise<string>;
}[] = [
  {
    test: urlTest(/i.redd.it/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/preview\.redd\.it/),
    extractor: urlExtractor,
  },
  {
    test: imgurImageTest,
    extractor: urlExtractor,
  },
];

export const isImage = (url: string) =>
  IMAGE_EXTRACTORS_URL.some((extractor) => extractor.test(url));
export const getImageExtractor = (url: string) => {
  const extractor = IMAGE_EXTRACTORS_URL.find((extractor) =>
    extractor.test(url)
  );
  if (extractor) return extractor;
};

// Galleries
export const GALLERY_EXTRACTORS: {
  test: (url: string) => boolean;
  extractor: (url: string) => Promise<string[]>;
}[] = [
  {
    test: urlTest(/https:\/\/imgur\.com\/a\/.*/),
    extractor: imgurAlbumExtractor,
  },
];

export const isGallery = (url: string) =>
  GALLERY_EXTRACTORS.some((extractor) => extractor.test(url));

export const getGalleryUrls = (url: string) => {
  const extractor = GALLERY_EXTRACTORS.find((extractor) => extractor.test(url));
  // check if extractor returns a promise
  if (extractor) return extractor;
};
