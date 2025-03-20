import { Post } from 'src/types/reddit/post';

export const getThumbnailUrl = (post: Post): string | undefined => {
  let url: string | undefined = post.data.thumbnail;
  const emptyThumbnails = ['', 'self', 'default', 'image', 'spoiler', 'nsfw'];

  if (emptyThumbnails.includes(url)) url = undefined;
  return url ?? post.data.preview?.images[0].resolutions[0].url;
};
