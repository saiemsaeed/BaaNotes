'use client';

import { dodoAtom } from '@/atoms/dodo';
import Checkbox from '@/components/checkbox';
import Header from '@/components/header';
import Input from '@/components/input';
import ListItem from '@/components/list-item';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';

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
      {dodos.map(({ text, completed }, index) => (
        <ListItem
          key={index}
          className={`flex items-center py-4 text-xl`}
          onDoubleTap={() => {
            updateDodo(index, !completed);
          }}
        >
          <span
            className={`mr-4 w-0 flex-grow text-wrap break-words text-[15px] text-lg leading-6 ${completed ? 'line-through' : ''}`}
          >
            {text}
          </span>
          <Checkbox
            isCompleted={completed}
            updateDodo={(isComplete) => updateDodo(index, isComplete)}
          />
        </ListItem>
      ))}
      <div className=" h-28" />
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-background">
        <Input addTodo={addTodo} />
      </div>
    </div>
  );
}
