import { Listing } from './base';

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
    score_hidden: boolean;
    ups: number;
    depth: number;
    link_id: string;
    parent_id: string;
    name: string;
  };
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
