type LocalStorageKeys = 'sidebarCollapse';

export const localStorage = {
  setItem: (key: LocalStorageKeys, value: string | boolean) => {
    if (typeof window !== 'undefined') {
      if (typeof value === 'boolean') {
        value = value.toString();
      }
      window.localStorage.setItem(key, value);
    }
  },
  getItem: (key: LocalStorageKeys) => {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem(key);

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
