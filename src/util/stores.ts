export const getLocalStorageKey =
  (storeName: string) => (propertyName: string) =>
    `${storeName}.${propertyName}`;
