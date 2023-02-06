type SessionStorageKeys = 'is_login';

export const sessionStorage = {
  setItem: (key: SessionStorageKeys, value: string | boolean) => {
    if (typeof window !== 'undefined') {
      if (typeof value === 'boolean') {
        value = value.toString();
      }
      window.sessionStorage.setItem(key, value);
    }
  },
  getItem: (key: SessionStorageKeys) => {
    if (typeof window !== 'undefined') {
      const value = window.sessionStorage.getItem(key);

      if (value === 'true' || value === 'false') {
        return value === 'true';
      } else {
        return value;
      }
    } else {
      return null;
    }
  },
};
