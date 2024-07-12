import { Post } from 'src/types/reddit/base';

export type SubredditResponse = {
  data: {
    after: string;
    children: Post[];
  };
};
