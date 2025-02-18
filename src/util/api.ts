import axios, { AxiosResponse } from 'axios';

import { useSettingsStore } from 'src/stores/settings-store';
import { useApiStore } from 'stores/api-store';

const AUTH_URL = 'https://www.reddit.com/api/v1/access_token';

const apiStore = useApiStore();
const settingsStore = useSettingsStore();

export const retrieveToken = async () => {
  const auth_url = settingsStore.redditAuthenticationProxyUrl ?? AUTH_URL;
  if (settingsStore.redditApplicationOnlyAppId) {
    const response = await axios.post(
      auth_url,
      {
        grant_type: 'https://oauth.reddit.com/grants/installed_client',
        device_id: apiStore.getDeviceId,
        duration: 'permanent',
      },
      {
        auth: {
          username: settingsStore.redditApplicationOnlyAppId,
          password: '',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    apiStore.bearerToken = response.data.access_token;
    apiStore.refreshToken = response.data.refresh_token;
    apiStore.tokenExpirationDate = new Date(
      Date.now() + response.data.expires_in * 1000
    );
  } else {
    throw new Error('No App ID set');
  }
};

export const redditGetResponse = <T>(
  url: string
): Promise<AxiosResponse<T>> => {
  const params = new URLSearchParams();
  params.append('raw_json', '1');

  if (
    settingsStore.useRedditApplicationOnlyOauth &&
    settingsStore.redditApplicationOnlyAppId
  ) {
    return oauthApi.get(url.toString(), { params });
  } else {
    return redditApi.get(url.toString());
  }
};

export const redditApi = axios.create({
  baseURL: 'https://www.reddit.com  ',
});

export const oauthApi = axios.create({
  baseURL: 'https://oauth.reddit.com',
});

oauthApi.interceptors.request.use(async (config) => {
  if (!apiStore.bearerToken) {
    await retrieveToken();
  } else if (
    apiStore.tokenExpirationDate &&
    apiStore.tokenExpirationDate < new Date()
  ) {
    await retrieveToken();
  }
  config.headers['Authorization'] = `Bearer ${apiStore.bearerToken}`;
  return config;
});
