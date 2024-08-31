import { Post } from './post';

export type SubredditResponse = {
  data: {
    after: string;
    children: Post[];
  };
};
