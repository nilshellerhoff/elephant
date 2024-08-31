import { IComment } from '../types/reddit/comment';

/** reorder comments such that replies are shown as children of their parents.
 * Uses name, parent_id and depth fields
 * */
export const reorderCommentTree = (comments: IComment[]): IComment[] => {
  const commentNames = comments.map((comment) => comment.data.name);

  // for each comment add it to the parent if exists. Since objects are only pointers,
  // we can build the tree in-place and finally just filter out the lower level comments
  comments.forEach((comment) => {
    if (commentNames.includes(comment.data.parent_id)) {
      const parent = comments.find(
        (parent) => parent.data.name == comment.data.parent_id
      );

      if (parent.data.replies === '') {
        parent.data.replies = {
          kind: 'Listing',
          data: {
            after: null,
            before: null,
            children: [],
          },
        };
      }

      parent.data.replies.data.children.push(comment);
    }
  });

  const depths = comments.map((comment) => comment.data.depth);
  const minDepth = Math.min(...depths);
  const topLevelComments = comments.filter(
    (comment) => comment.data.depth == minDepth
  );

  return topLevelComments;
};
