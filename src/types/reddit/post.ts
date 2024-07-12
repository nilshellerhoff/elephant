import { IComment, Kind, PostData } from 'src/types/reddit/base';

export type PostInformation = {
  kind: Kind;
  data: {
    after: string | null;
    children: [
      {
        kind: Kind;
        data: PostData;
      }
    ];
  };
};

export type PostComments = {
  kind: Kind;
  data: {
    after: string | null;
    children: IComment[];
  };
};

export type PostResponse = [PostInformation, PostComments];
