import { Dodo } from '@/models/doto';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Flex, IconButton, TextField } from '@radix-ui/themes';
import React from 'react';

interface Props {
  addTodo: (newTodo: string) => void;
}

const Input = ({ addTodo }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value !== '') {
      addTodo(event.currentTarget.value);
      event.currentTarget.value = '';
    }
  };

  const handleSubmit = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      addTodo(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <Flex align="center">
      <TextField.Root
        variant="surface"
        size="3"
        className="flex-grow border-0 border-solid border-foreground font-mono"
        style={{ height: '3rem' }}
      >
        <TextField.Input
          id="todo-input"
          ref={inputRef}
          autoFocus
          variant="surface"
          placeholder="Write your mind…"
          radius="medium"
          size="3"
          onKeyDown={handleKeyDown}
          className=" outline-violet3"
        />
      </TextField.Root>
      <div className="ml-3">
        <IconButton
          size="4"
          variant="ghost"
          radius="full"
          onClick={handleSubmit}
        >
          <PaperPlaneIcon
            height="24"
            width="24"
            className="fill-violet8"
            color="violet8"
          />
        </IconButton>
      </div>
    </Flex>
  );
};

export default Input;
