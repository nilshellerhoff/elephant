import { IComment } from 'src/types/reddit/comment';
import { FlairBackgroundColor } from 'src/types/reddit/flair';
import { Post } from 'src/types/reddit/post';

export const commentHasFlair = (comment: IComment) => {
  return Boolean(comment.data.author_flair_text !== null);
};

export const postHasFlair = (post: Post) => {
  return Boolean(post.data.link_flair_text !== null);
};

export const backgroundIsSet = (backgroundColor: FlairBackgroundColor) => {
  return (
    backgroundColor !== null &&
    backgroundColor !== '' &&
    backgroundColor !== 'transparent'
  );
};
