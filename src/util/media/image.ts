import { Post } from 'src/types/reddit/post';
import { urlExtractor, urlTest } from 'src/util/media/util';

export const imgurImageTestUrl = (url: string) => {
  if (url.includes('.gifv')) return false;
  return urlTest(/i.imgur.com/)(url);
};

export const IMAGE_EXTRACTORS_URL: {
  test: (url: string) => boolean;
  extractor: (url: string) => string;
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
    test: imgurImageTestUrl,
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.jpg$/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.jpeg$/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.png$/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.gif$/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.webp$/),
    extractor: urlExtractor,
  },
];

export const IMAGE_EXTRACTORS: {
  test: (post: Post) => boolean;
  extractor: (post: Post) => string;
}[] = IMAGE_EXTRACTORS_URL.map(({ test, extractor }) => ({
  test: (post) => test(post.data.url),
  extractor: (post) => extractor(post.data.url),
}));

export const isImage = (post: Post) =>
  IMAGE_EXTRACTORS.some((extractor) => extractor.test(post));

export const isImageUrl = (url: string) =>
  IMAGE_EXTRACTORS_URL.some((extractor) => extractor.test(url));
