import { Post } from 'src/types/reddit/post';
import { IComment } from 'src/types/reddit/comment';

export type UserResponse = {
  data: {
    after: string;
    children: Post[] | IComment[];
  };
};
