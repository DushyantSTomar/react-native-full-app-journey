import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'AUTH_TOKEN';

export const authStorage = {
  saveToken: async (token: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  getToken: async () => {
    return AsyncStorage.getItem(TOKEN_KEY);
  },

  clearToken: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};
