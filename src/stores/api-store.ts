import { defineStore } from 'pinia';
import { RemovableRef, useLocalStorage } from '@vueuse/core';

interface ApiStore {
  bearerToken: RemovableRef<string | null>;
  refreshToken: RemovableRef<string | null>;
  tokenExpirationDate: RemovableRef<Date | null>;
  deviceId: RemovableRef<string>;
}

const generateDeviceId = () => {
  return [...Array(24)].map(() => Math.random().toString(36)[2]).join('');
};

export const useApiStore = defineStore('api', {
  state: (): ApiStore => ({
    bearerToken: useLocalStorage('bearerToken', null),
    refreshToken: useLocalStorage('refreshToken', null),
    tokenExpirationDate: useLocalStorage('tokenExpirationDate', new Date(0)),
    deviceId: useLocalStorage('deviceId', ''),
  }),
  getters: {
    getDeviceId(): string {
      if (!this.deviceId) {
        this.deviceId = generateDeviceId();
      }
      return this.deviceId;
    },
  },
  actions: {},
});
