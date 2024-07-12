export type Kind = 'Listing' | 't3' | 't1';

export type Listing<T> = {
  kind: 'Listing';
  data: {
    after: string | null;
    before: string | null;
    children: T[];
  };
};

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
};

export type Post = {
  kind: string;
  data: PostData;
};

export type CommentMore = {
  kind: 'more';
  data: {
    count: number;
    depth: number;
    id: string;
    name: string;
    parent_id: string;
  };
};

export type IComment = {
  kind: 't1';
  data: {
    id: string;
    subreddt: string;
    replies: Listing<IComment> | '';
    author: string;
    body: string;
    edited: boolean;
    body_html: string;
    permalink: string;
    created_utc: number;
    score: number;
    ups: number;
    depth: number;
  };
};

export const isMore = (
  comment: CommentMore | IComment
): comment is CommentMore => comment.kind == 'more';
export const isComment = (
  comment: CommentMore | IComment
): comment is IComment => comment.kind == 't1';

export type ICommentReply = {
  kind: 't1';
};
