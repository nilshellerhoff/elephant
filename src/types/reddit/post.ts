import { Kind } from 'src/types/reddit/base';
import { IComment } from './comment';
import { AuthorFlair, LinkFlair } from 'src/types/reddit/flair';

export type MediaEntryImage = {
  u: string;
  x: number;
  y: number;
};

export type PreviewImageEntry = {
  id: string;
  resolutions: {
    height: number;
    width: number;
    url: string;
  }[];
  source: {
    height: number;
    width: number;
    url: string;
  };
  variants: any;
};

export type MediaRedditVideo = {
  bitrate_kbps: number;
  fallback_url: string;
  has_audio: boolean;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: 'completed';
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
  media: {
    reddit_video: MediaRedditVideo;
  };
  preview?: {
    enabled: boolean;
    images: PreviewImageEntry[];
  };
  stickied: boolean;
  over_18: boolean;
} & AuthorFlair &
  LinkFlair;

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
