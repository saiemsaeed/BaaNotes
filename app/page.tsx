'use client';

import { dodoAtom } from '@/atoms/dodo';
import Checkbox from '@/components/checkbox';
import Input from '@/components/input';
import { Dodo } from '@/models/doto';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
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
import { Inter, JetBrains_Mono } from 'next/font/google';

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
      <div className="-ml-4 -mr-4 mb-4 bg-foreground px-4 py-6 font-mono">
        made with ❤️
      </div>

      <div className="hidden ">
        <Input addTodo={addTodo} />
      </div>
      {dodos.map((dodo, index) => (
        <Box
          key={index}
          className={`border-background font-mono text-xl  ${
            index === 0 ? '' : 'mt-4 border-t-2 border-background pt-4'
          }`}
          onTouchEnd={(e) => {
            e.preventDefault();
            updateDodo(index, !dodo.completed);
          }}
        >
          <Flex className="mb-2" gap="0">
            <Checkbox
              id={dodo.id}
              label={dodo.text}
              isCompleted={dodo.completed}
              updateDodo={(isComplete) => updateDodo(index, isComplete)}
            />
          </Flex>
        </Box>
      ))}
      <div className="fixed bottom-10 left-4 right-4">
        <Input addTodo={addTodo} />
      </div>
    </Container>
  );
}
