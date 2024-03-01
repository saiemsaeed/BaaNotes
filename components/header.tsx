import React, { MouseEventHandler, useState } from 'react';
import ThemeSwitch from './theme-switch';
import {
  HamburgerMenuIcon,
  LetterCaseCapitalizeIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/button';
import dynamic from 'next/dynamic';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useAtom } from 'jotai';
import { FontOptions, fontAtom } from '@/atoms/font';

interface HeaderProps {}

const ThemeSwitchButton = dynamic(() => import('@/components/theme-switch'), {
  ssr: false,
});

const Header: React.FC<HeaderProps> = ({}) => {
  const [activeFont, setActiveFont] = useAtom(fontAtom);
  const [selectedFont, setSelectedFont] = useState<FontOptions>(activeFont);
  const [isFontDrawerOpen, setFontDrawerOpen] = useState(false);

  const handleFontDrawerOpen = () => {
    setFontDrawerOpen(true);
  };

  const handleFontDrawerClose = () => {
    setFontDrawerOpen(false);
    setSelectedFont(activeFont);
  };

  const handleSelectedFontChange = (value: FontOptions) => {
    setSelectedFont(value as FontOptions);
  };

  const handleActiveFontChange = () => {
    setActiveFont(selectedFont);
    if (selectedFont === 'sans')
      document.documentElement.classList.replace('font-mono', 'font-sans');
    else if (selectedFont === 'mono')
      document.documentElement.classList.replace('font-sans', 'font-mono');

    setFontDrawerOpen(false);
  };

  return (
    <header className=" fixed left-0 right-0 top-0 mb-4 flex h-14 flex-grow items-center justify-between bg-primary px-4">
      <span>made with ❤️</span>
      <div className="flex">
        <ThemeSwitchButton />
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-accent active:bg-accent"
          onClick={handleFontDrawerOpen}
        >
          <LetterCaseCapitalizeIcon />
        </Button>
        {/* <Menubar asChild>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent active:bg-accent "
              >
                <HamburgerMenuIcon />
              </Button>
            </MenubarTrigger>
            <MenubarContent align="end" className="bg-primary">
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator className="bg-primary-foreground" />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar> */}
      </div>
      <Drawer open={isFontDrawerOpen} onClose={handleFontDrawerClose}>
        <DrawerPortal>
          <DrawerContent className="rounded-none border-x-0">
            <DrawerHeader>
              <DrawerTitle>Select Font</DrawerTitle>
            </DrawerHeader>
            <ToggleGroup
              type="single"
              variant="outline"
              className="my-5"
              value={selectedFont}
              onValueChange={handleSelectedFontChange}
            >
              <ToggleGroupItem
                value="sans"
                aria-label="Toggle Font Sans"
                className="h-16"
              >
                <p className="font-sans text-4xl">Aa</p>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="mono"
                aria-label="Toggle Font Mono"
                className="h-16"
              >
                <p className="font-mono text-4xl">Aa</p>
              </ToggleGroupItem>
            </ToggleGroup>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={handleFontDrawerClose}
                  className=""
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button onClick={handleActiveFontChange} className="">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </header>
  );
};

export default Header;
