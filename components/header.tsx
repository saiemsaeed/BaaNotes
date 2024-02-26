import React from 'react';
import ThemeSwitch from './theme-switch';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import dynamic from 'next/dynamic';

interface HeaderProps {}

const ThemeSwitchButton = dynamic(() => import('@/components/theme-switch'), {
  ssr: false,
});

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className=" bg-accent fixed left-0 right-0 top-0 mb-4 flex h-14 flex-grow items-center justify-between px-4 font-mono">
      <span>made with ❤️</span>
      <div className="flex">
        <ThemeSwitchButton />
        {/* <Button variant="ghost" size="icon">
          <HamburgerMenuIcon className="text-inverted h-5" />
        </Button> */}
      </div>
    </header>
  );
};

export default Header;
