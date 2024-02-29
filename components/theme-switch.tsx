'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { FC, useEffect, useState } from 'react';
import { Button } from './ui/button';

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
        <Button
          onClick={handleLightMode}
          variant="ghost"
          size="icon"
          className="hover:bg-accent active:bg-accent"
        >
          <SunIcon />
        </Button>
      )}
      {!isDarkTheme && (
        <Button onClick={handleDarkMode} variant="ghost" size="icon">
          <MoonIcon />
        </Button>
      )}
    </>
  );
};

export default ThemeSwitch;
