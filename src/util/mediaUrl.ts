export const urlTest = (expression: RegExp) => (url: string) =>
  expression.test(url);
export const imgurImageTest = (url: string) => {
  if (url.includes('.gifv')) return false;
  return urlTest(/i.imgur.com/)(url);
};

const urlExtractor = (url: string): string => url;

// Images
export const IMAGE_EXTRACTORS_URL: {
  test: (url: string) => boolean;
  extractor: (url: string) => string;
}[] = [
  {
    test: urlTest(/i.redd.it/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/preview\.redd\.it/),
    extractor: urlExtractor,
  },
  {
    test: imgurImageTest,
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.jpg$/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.jpeg$/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.png$/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.gif$/),
    extractor: urlExtractor,
  },
  {
    test: urlTest(/\.webp$/),
    extractor: urlExtractor,
  },
];

export const isImage = (url: string) =>
  IMAGE_EXTRACTORS_URL.some((extractor) => extractor.test(url));
