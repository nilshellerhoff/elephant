const defaultExtractor = (url: string): string => url;

export const IMAGE_EXTRACTORS: {
  expression: RegExp;
  extractor: (string) => string;
}[] = [
  {
    expression: /i.redd.it/,
    extractor: defaultExtractor,
  },
];

export const IMAGE_HOSTS = IMAGE_EXTRACTORS.map(
  (extractor) => extractor.expression
);

export const isImage = (url: string) =>
  IMAGE_HOSTS.some((exp) => exp.test(url));
