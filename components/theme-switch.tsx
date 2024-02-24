import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { FC, useEffect, useState } from 'react';

export const useTheme = () => {
  const theme = document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';

  return { isDarkTheme: theme === 'dark', isLightTheme: theme === 'light' };
};

const ThemeSwitch = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    document.documentElement.classList.contains('dark'),
  );

  const listener = (e: MediaQueryList | MediaQueryListEvent) => {
    setIsDarkTheme(e.matches);
    if (e.matches) document.documentElement.classList.replace('light', 'dark');
    else document.documentElement.classList.replace('dark', 'light');
  };

  useEffect(() => {
    if (localStorage.theme === 'dark' || localStorage.theme === 'light') return;

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    listener(systemTheme);

    systemTheme.addEventListener('change', listener);

    return () => systemTheme.removeEventListener('change', () => {});
  }, []);

  const handleDarkMode = async () => {
    const switchOff = new Audio('./switch-off.mp3');
    await switchOff.play();
    setIsDarkTheme(true);
    localStorage.theme = 'dark';
    document.documentElement.classList.replace('light', 'dark');
  };

  const handleLightMode = async () => {
    const switchOn = new Audio('./switch-on.mp3');
    await switchOn.play();
    setIsDarkTheme(false);
    localStorage.theme = 'light';
    document.documentElement.classList.replace('dark', 'light');
  };

  return (
    <>
      {isDarkTheme && (
        <IconButton onClick={handleLightMode} variant="ghost" size="4">
          <SunIcon height={20} width={20} className="text-inverted" />
        </IconButton>
      )}
      {!isDarkTheme && (
        <IconButton onClick={handleDarkMode} variant="ghost" size="4">
          <MoonIcon height={20} width={20} className="text-inverted" />
        </IconButton>
      )}
    </>
  );
};

export default ThemeSwitch;
