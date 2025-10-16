import { Post } from 'src/types/reddit/post';

import { urlTestPost } from 'src/util/media/util';

const redditGalleryExtractor = (post: Post): string[] => {
  // images need sorting based on gallery_data object
  return post.data.gallery_data.items.map((item) => {
    const media = post.data.media_metadata[item.media_id];
    if (media.e === 'AnimatedImage') return media.s.gif;
    else return media.s.u;
  });
};

export const GALLERY_EXTRACTORS: {
  test: (post: Post) => boolean;
  extractor: (post: Post) => string[];
}[] = [
  {
    test: urlTestPost(/https:\/\/www.reddit.com\/gallery/),
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
