import { Kind } from 'src/types/reddit/base';
import { IComment } from './comment';

export type LinkFlairRichtextPartText = {
  e: 'text';
  t: string;
};

export type LinkFlairRichtextPartEmoji = {
  a: string;
  e: 'emoji';
  u: string;
};

export type LinkFlairRichtextPartUnknown = {
  e: 'unknown';
};

export type LinkFlairRichtextPart =
  | LinkFlairRichtextPartText
  | LinkFlairRichtextPartEmoji
  | LinkFlairRichtextPartUnknown;

export type MediaEntryImage = {
  u: string;
  x: number;
  y: number;
};

export type PostData = {
  subreddit: string;
  title: string;
  selftext: string;
  selftext_html: string;
  ups: number;
  upvote_ratio: number;
  name: string;
  num_comments: number;
  thumbnail: string | 'self' | 'default';
  permalink: string;
  link_id: string;
  url: string;
  is_video: boolean;
  created: number;
  created_utc: number;
  link_flair_background_color: string;
  link_flair_text: string;
  link_flair_text_color: 'dark' | 'light';
  link_flair_type: 'richtext';
  link_flair_richtext: LinkFlairRichtextPart[];
  gallery_data: {
    items: {
      media_id: string;
      id: number;
    }[];
  };
  media_metadata: {
    [id: string]: {
      e: 'Image';
      id: string;
      m: string;
      p: MediaEntryImage[];
      s: MediaEntryImage;
      status: 'valid';
    };
  };
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
