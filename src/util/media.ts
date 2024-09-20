import { Post } from 'src/types/reddit/post';
import { VideoExtractor } from 'src/types/media';

export const urlTest = (expression: RegExp) => (post: Post) =>
  expression.test(post.data.url);

const urlExtractor = (post: Post): string => post.data.url;

// Images
export const IMAGE_EXTRACTORS: {
  test: (post: Post) => boolean;
  extractor: (post: Post) => string;
}[] = [
  {
    test: urlTest(/i.redd.it/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/i.imgur.com/),
    extractor: urlExtractor,
  },
];

export const isImage = (post: Post) =>
  IMAGE_EXTRACTORS.some((extractor) => extractor.test(post));

// Galleries
const redditGalleryExtractor = (post: Post): string[] => {
  // images need sorting based on gallery_data object
  return post.data.gallery_data.items.map(
    (item) => post.data.media_metadata[item.media_id].s.u
  );
};

export const GALLERY_EXTRACTORS: {
  test: (post: Post) => boolean;
  extractor: (post: Post) => string[];
}[] = [
  {
    test: urlTest(/https:\/\/www.reddit.com\/gallery/),
    extractor: redditGalleryExtractor,
  },
];

export const isGallery = (post: Post) =>
  GALLERY_EXTRACTORS.some((extractor) => extractor.test(post));

export const getGalleryUrls = (post: Post): string[] | undefined => {
  const extractor = GALLERY_EXTRACTORS.find((extractor) =>
    extractor.test(post)
  );
  if (extractor) return extractor.extractor(post);
};

// Videos
export const redditM3u8Extractor: VideoExtractor = (post) => {
  return {
    type: 'application/x-mpegURL',
    url: post.data.media.reddit_video.hls_url,
  };
};

export const VIDEO_EXTRACTORS: {
  test: (post: Post) => boolean;
  extractor: VideoExtractor;
}[] = [
  {
    test: urlTest(/https:\/\/v.redd.it\//),
    extractor: redditM3u8Extractor,
  },
];

export const isVideo = (post: Post) =>
  VIDEO_EXTRACTORS.some((extractor) => extractor.test(post));

export const getVideoExtractor = (post: Post) =>
  VIDEO_EXTRACTORS.find((extractor) => extractor.test(post));
