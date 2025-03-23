import { DarkMode } from 'stores/settings-store';

export const toQuasarDarkSetting = (darkMode: DarkMode) => {
  switch (darkMode) {
    case DarkMode.light:
      return false;
    case DarkMode.dark:
      return true;
    case DarkMode.auto:
      return 'auto';
  }
};
