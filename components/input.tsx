import { PaperPlaneIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Button } from './ui/button';
import { Input as TextField } from './ui/input';

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
    <div className="flex h-full items-center border-t-[1px] px-4">
      <TextField
        ref={inputRef}
        type="text"
        placeholder="Write your mind..."
        onKeyDown={handleKeyDown}
        className="h-10 border-muted bg-background text-[16px] outline-none"
      />
      <div className="ml-3">
        <Button
          size="icon"
          variant="secondary"
          className="bg-accent"
          onClick={handleSubmit}
        >
          <PaperPlaneIcon
            height="20"
            width="20"
            className="fill-accent-foreground"
            color="accent"
          />
        </Button>
      </div>
    </div>
  );
};

export default Input;
