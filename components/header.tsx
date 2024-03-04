import React, { MouseEventHandler, useState } from 'react';
import ThemeSwitch from './theme-switch';
import {
  ButtonIcon,
  CalendarIcon,
  Cross1Icon,
  FontStyleIcon,
  Half2Icon,
  HamburgerMenuIcon,
  LetterCaseCapitalizeIcon,
  MoonIcon,
  SunIcon,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { ThemeOptions, themeAtom } from '@/atoms/theme';

interface HeaderProps {}

const ThemeSwitchButton = dynamic(() => import('@/components/theme-switch'), {
  ssr: false,
});

const Header: React.FC<HeaderProps> = ({}) => {
  const [activeFont, setActiveFont] = useAtom(fontAtom);
  const [selectedFont, setSelectedFont] = useState<FontOptions>(activeFont);
  const [isFontDrawerOpen, setFontDrawerOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useAtom(themeAtom);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOptions>(activeTheme);
  const [isThemeDrawerOpen, setThemeDrawerOpen] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handleCalendarToggle = (isOpen: boolean) => {
    setCalendarOpen(isOpen);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setCalendarOpen(false);
  };

  const handleThemeDrawerOpen = () => {
    setThemeDrawerOpen(true);
  };

  const handleThemeDrawerClose = () => {
    setThemeDrawerOpen(false);
    setActiveTheme(selectedTheme);
  };
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

  const handleSelectedThemeChage = (value: ThemeOptions) => {
    setSelectedTheme(value);
  };

  const handleActiveFontChange = () => {
    setActiveFont(selectedFont);
    if (selectedFont === 'sans')
      document.documentElement.classList.replace('font-mono', 'font-sans');
    else if (selectedFont === 'mono')
      document.documentElement.classList.replace('font-sans', 'font-mono');

    setFontDrawerOpen(false);
  };

  const handleActiveThemeChange = () => {
    setActiveTheme(selectedTheme);
    if (selectedTheme === 'light')
      document.documentElement.classList.replace('dark', 'light');
    else if (selectedTheme === 'dark')
      document.documentElement.classList.replace('light', 'dark');

    setThemeDrawerOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 mb-4 flex h-14 flex-grow items-center justify-between border-b-2 border-muted bg-background px-2 shadow-sm">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="p-0 text-accent hover:bg-accent active:bg-accent"
          >
            <HamburgerMenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col border-muted bg-background px-4 pt-2"
        >
          <SheetHeader className="mt-2 flex flex-row items-center justify-between space-y-0">
            <SheetTitle>Lists</SheetTitle>
            <SheetClose asChild>
              <Button size="icon" variant="ghost" className="mt-0">
                <Cross1Icon />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="flex-grow">Text Goes Here</div>
          <SheetFooter className="flex gap-2">
            <SheetClose asChild>
              <Button variant="outline" onClick={handleFontDrawerOpen}>
                <LetterCaseCapitalizeIcon className="mr-2 h-4 w-4" />
                Change Font
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="outline" onClick={handleThemeDrawerOpen}>
                <Half2Icon className="mr-2 h-4 w-4" />
                Change Theme
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <span className=" font-bold">Today️</span>
      <div className="flex">
        <Popover open={isCalendarOpen} onOpenChange={handleCalendarToggle}>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-accent hover:bg-accent active:bg-accent"
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto border-muted p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
              className="rounded-md bg-background text-foreground"
              classNames={{
                day_selected: 'bg-accent text-accent-foreground',
                day_today: 'bg-background text-foreground border',
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Drawer open={isThemeDrawerOpen} onClose={handleThemeDrawerClose}>
        <DrawerPortal>
          <DrawerContent className="rounded-none border-x-0">
            <DrawerHeader>
              <DrawerTitle>Select Theme</DrawerTitle>
            </DrawerHeader>
            <ToggleGroup
              type="single"
              variant="outline"
              className="my-5 gap-6"
              value={selectedTheme}
              onValueChange={handleSelectedThemeChage}
            >
              <ToggleGroupItem
                value="light"
                aria-label="Toggle Font Sans"
                className="h-16 w-20"
              >
                <div className="flex flex-col items-center justify-center">
                  <SunIcon className="mb-1" />
                  <span>Light</span>
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="dark"
                aria-label="Toggle Font Mono"
                className="h-16 w-20"
              >
                <div className="flex flex-col items-center justify-center">
                  <MoonIcon className="mb-1" />
                  <span>Dark</span>
                </div>
              </ToggleGroupItem>
              {/* <ToggleGroupItem
                value="system"
                aria-label="Toggle Font Mono"
                className="h-16 w-20"
              >
                <div className="flex flex-col items-center justify-center">
                  <Half2Icon className="mb-1" />
                  <span>System</span>
                </div>
              </ToggleGroupItem> */}
            </ToggleGroup>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={handleThemeDrawerClose}
                  className=""
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button onClick={handleActiveThemeChange} className="">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
      <Drawer open={isFontDrawerOpen} onClose={handleFontDrawerClose}>
        <DrawerPortal>
          <DrawerContent className="rounded-none border-x-0">
            <DrawerHeader>
              <DrawerTitle>Select Font</DrawerTitle>
            </DrawerHeader>
            <ToggleGroup
              type="single"
              variant="outline"
              className="my-5 gap-6"
              value={selectedFont}
              onValueChange={handleSelectedFontChange}
            >
              <ToggleGroupItem
                value="sans"
                aria-label="Toggle Font Sans"
                className="h-16 w-20"
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="mb-1 font-sans text-4xl">Aa</p>
                  <p className="font-sans">Sans</p>
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="mono"
                aria-label="Toggle Font Mono"
                className="h-16 w-20"
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="font-mono text-4xl">Aa</p>
                  <p className="font-mono">Mono</p>
                </div>
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
