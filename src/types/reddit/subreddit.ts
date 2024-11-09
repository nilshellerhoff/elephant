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
    display_name: string;
    display_name_prefixed: string;
    title: string;
    description: string;
    community_icon: string;
    banner_background_image: string;
    icon_img: string;
    url: string;
  };
};
