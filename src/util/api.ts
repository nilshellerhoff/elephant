import axios, { AxiosResponse } from 'axios';

export const apiClient = axios.create({});

export const redditGetResponse = <T>(
  url: string
): Promise<AxiosResponse<T>> => {
  const urlObj = new URL(url);
  urlObj.searchParams.set('raw_json', '1');
  urlObj.pathname = urlObj.pathname.replaceAll('//', '/');
  return axios.get(urlObj.toString());
};
