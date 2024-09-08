import { Post } from 'src/types/reddit/post';

export const urlTest = (expression: RegExp) => (post: Post) =>
  expression.test(post.data.url);
const defaultExtractor = (post: Post): string => post.data.url;
const redditGalleryExtractor = (post: Post): string[] => {
  return Object.values(post.data.media_metadata).map((entry) => entry.s.u);
};

export const IMAGE_EXTRACTORS: {
  test: (post: Post) => boolean;
  extractor: (post: Post) => string;
}[] = [
  {
    test: urlTest(/i.redd.it/),
    extractor: defaultExtractor,
  },
  {
    test: urlTest(/i.imgur.com/),
    extractor: defaultExtractor,
  },
];

export const GALLERY_EXTRACTORS: {
  test: (post: Post) => boolean;
  extractor: (post: Post) => string[];
}[] = [
  {
    test: urlTest(/https:\/\/www.reddit.com\/gallery/),
    extractor: redditGalleryExtractor,
  },
];

export const isImage = (post: Post) =>
  IMAGE_EXTRACTORS.some((extractor) => extractor.test(post));
export const isGallery = (post: Post) =>
  GALLERY_EXTRACTORS.some((extractor) => extractor.test(post));
export const getGalleryUrls = (post: Post): string[] | undefined => {
  const extractor = GALLERY_EXTRACTORS.find((extractor) =>
    extractor.test(post)
  );
  if (extractor) return extractor.extractor(post);
};
