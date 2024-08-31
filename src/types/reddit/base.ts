export type Kind = 'Listing' | 't3' | 't1';

export type Listing<T> = {
  kind: 'Listing';
  data: {
    after: string | null;
    before: string | null;
    children: T[];
  };
};
