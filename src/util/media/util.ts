import { Post } from 'src/types/reddit/post';

export const urlTest = (expression: RegExp) => (url: string) =>
  expression.test(url);

export const urlTestPost = (expression: RegExp) => (post: Post) =>
  expression.test(post.data.url);

export const urlExtractor = (url: string): string => url;
