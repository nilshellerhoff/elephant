import { Kind } from 'src/types/reddit/base';
import { IComment } from './comment';

export type PostData = {
  subreddit: string;
  title: string;
  selftext: string;
  ups: number;
  upvote_ratio: number;
  name: string;
  num_comments: number;
  thumbnail: string | 'self' | 'default';
  permalink: string;
  link_id: string;
  url: string;
  is_video: boolean;
};

export type PostInformation = {
  kind: Kind;
  data: {
    after: string | null;
    children: Post[];
  };
};

export type PostComments = {
  kind: Kind;
  data: {
    after: string | null;
    children: IComment[];
  };
};

export type Post = {
  kind: Kind;
  data: PostData;
};

export type PostResponse = [PostInformation, PostComments];
