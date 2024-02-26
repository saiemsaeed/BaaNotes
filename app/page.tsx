'use client';

import { dodoAtom } from '@/atoms/dodo';
import Checkbox from '@/components/checkbox';
import Header from '@/components/header';
import Input from '@/components/input';
import ListItem from '@/components/list-item';
import { atom, useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

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
    <div className="mx-4">
      <Header />
      <div className="h-14" />
      <div className="hidden ">
        <Input addTodo={addTodo} />
      </div>
      {dodos.map((dodo, index) => (
        <ListItem
          key={index}
          className={`flex h-12 items-center font-sans text-xl ${
            index === 0 ? '' : 'border-muted border-t-[1px]'
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
      <div className=" h-28" />
      <div className="bg-muted fixed bottom-0 left-0 right-0 h-14">
        <Input addTodo={addTodo} />
      </div>
    </div>
  );
}
