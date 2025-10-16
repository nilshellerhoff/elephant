import { Post } from 'src/types/reddit/post';
import { VideoExtractor } from 'src/types/media';

import { urlTestPost } from 'src/util/media/util';

export const redditM3u8Extractor: VideoExtractor = (post) => {
  return {
    type: 'application/x-mpegURL',
    url: post.data.media.reddit_video.hls_url,
    duration: post.data.media.reddit_video.duration,
  };
};

export const imgurGifvExtractor: VideoExtractor = (post) => ({
  type: 'video/mp4',
  url: post.data.url.replace('.gifv', '.mp4'),
});

export const VIDEO_EXTRACTORS: {
  test: (post: Post) => boolean;
  extractor: VideoExtractor;
}[] = [
  {
    test: urlTestPost(/https:\/\/v.redd.it\//),
    extractor: redditM3u8Extractor,
  },
  {
    test: urlTestPost(/https:\/\/i.imgur.com\/.*\.gifv/),
    extractor: imgurGifvExtractor,
  },
];

export const isVideo = (post: Post) =>
  VIDEO_EXTRACTORS.some((extractor) => extractor.test(post));

export const getVideoExtractor = (post: Post) =>
  VIDEO_EXTRACTORS.find((extractor) => extractor.test(post));

export const getVideoDuration = (post: Post) => {
  const extractor = getVideoExtractor(post);
  if (extractor) return extractor.extractor(post).duration;
};
