import { Post } from 'src/types/reddit/post';

export const getThumbnailUrl = (post: Post): string | undefined => {
  let url: string | undefined = post.data.thumbnail;
  const emptyThumbnails = ['', 'self', 'default', 'image', 'spoiler', 'nsfw'];

  if (emptyThumbnails.includes(url)) url = undefined;
  return url ?? post.data.preview?.images[0].resolutions[0].url;
};

export const getPostLinkHost = (post: Post): string | undefined => {
  let host = post.data.url.split('//')[1].split('/')[0];
  if (host.startsWith('www.')) host = host.slice(4);
  if (host === 'reddit.com' || host === 'i.redd.it' || host === 'v.redd.it')
    return undefined;
  return host;
};
