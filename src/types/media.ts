import { Post } from 'src/types/reddit/post';

export type VideoExtractor = (post: Post) => {
  type?: string;
  url: string;
  duration?: number;
};
