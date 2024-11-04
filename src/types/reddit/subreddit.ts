import { Post } from './post';

export type SubredditResponse = {
  data: {
    after: string;
    children: Post[];
  };
};

export type SubredditAboutResponse = {
  kind: 't5';
  data: {
    title: string;
    description: string;
    community_icon: string;
    banner_background_image: string;
  };
};
