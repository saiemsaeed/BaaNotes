'use client';

import { dodoAtom } from '@/atoms/dodo';
import Checkbox from '@/components/checkbox';
import Input from '@/components/input';
import ListItem from '@/components/list-item';
import ThemeSwitch from '@/components/theme-switch';
import { DotsVerticalIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import {
  Box,
  Container,
  TextField,
  Text,
  IconButton,
  Flex,
} from '@radix-ui/themes';
import { atom, useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import { Inter, JetBrains_Mono } from 'next/font/google';

const ThemeSwitchButton = dynamic(() => import('@/components/theme-switch'), {
  ssr: false,
});

export default function Home() {
  const [dodos, setDodos] = useAtom(dodoAtom);

  const addTodo = (newDodo: string) => {
    setDodos((dodos) => [
      {
        id: nanoid(),
        text: newDodo,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      ...dodos,
    ]);
  };

  const updateDodo = (index: number, isComplete: boolean) => {
    setDodos((dodos) => {
      const newDodos = [...dodos];
      newDodos[index].completed = isComplete;
      newDodos[index].updatedAt = Date.now();
      return newDodos;
    });
  };

  return (
    <Container className={`mx-4`}>
      <Flex
        align="center"
        justify="between"
        className="bg-accent -ml-4 -mr-4 mb-4 px-4 py-6 font-mono"
      >
        <Text>made with ❤️</Text>
        <ThemeSwitchButton />
      </Flex>

      <div className="hidden ">
        <Input addTodo={addTodo} />
      </div>
      {dodos.map((dodo, index) => (
        <ListItem
          key={index}
          className={`font-mono text-xl ${
            index === 0 ? '' : 'mt-4 border-t-2 border-background pt-4'
          }`}
          onDoubleTap={() => {
            updateDodo(index, !dodo.completed);
          }}
        >
          <Checkbox
            id={dodo.id}
            label={dodo.text}
            isCompleted={dodo.completed}
            updateDodo={(isComplete) => updateDodo(index, isComplete)}
          />
        </ListItem>
      ))}
      <Box height="100px" />
      <div className="fixed bottom-0 left-0 right-0 bg-background p-4">
        <Input addTodo={addTodo} />
      </div>
    </Container>
  );
}
