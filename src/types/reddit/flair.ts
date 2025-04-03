export type FlairType = 'richtext' | 'text';
export type FlairTextColor = 'dark' | 'light' | null;
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

export type FlairRichtextPart =
  | LinkFlairRichtextPartText
  | LinkFlairRichtextPartEmoji
  | LinkFlairRichtextPartUnknown;
export type FlairBackgroundColor = string | null;

export type Flair = {
  flair_background_color: FlairBackgroundColor;
  flair_text: string;
  flair_text_color: FlairTextColor;
  flair_type: FlairType;
  flair_richtext: FlairRichtextPart[];
};

export type AuthorFlair = {
  [K in keyof Flair as `author_${K}`]: Flair[K];
};

export type LinkFlair = {
  [K in keyof Flair as `link_${K}`]: Flair[K];
};
