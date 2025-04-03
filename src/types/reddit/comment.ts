import { Listing } from './base';
import { AuthorFlair } from 'src/types/reddit/flair';

export type IComment = {
  kind: 't1';
  data:
    | {
        id: string;
        subreddt: string;
        replies: Listing<IComment> | '';
        author: string;
        body: string;
        edited: false | number;
        body_html: string;
        permalink: string;
        created_utc: number;
        score: number;
        score_hidden: boolean;
        ups: number;
        depth: number;
        link_id: string;
        parent_id: string;
        name: string;
        controversiality: number;
        stickied: boolean;
        is_submitter: boolean;
      } & AuthorFlair;
};
export type CommentMore = {
  kind: 'more';
  data: {
    children: string[];
    count: number;
    depth: number;
    id: string;
    name: string;
    parent_id: string;
  };
};

export const isMore = (
  comment: CommentMore | IComment
): comment is CommentMore => comment.kind == 'more';
export const isComment = (
  comment: CommentMore | IComment
): comment is IComment => comment.kind == 't1';
