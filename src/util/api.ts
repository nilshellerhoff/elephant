import axios, { AxiosResponse } from 'axios';

export const apiClient = axios.create({
});

export const redditGetResponse = <T>(url: string): Promise<AxiosResponse<T>> => {
  const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`
  return axios.get(proxiedUrl)
}
