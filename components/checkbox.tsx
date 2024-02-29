import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

interface Props {
  id: string;
  label: string;
  isCompleted: boolean;
  updateDodo: (isComplete: boolean) => void;
}

const Checkbox = ({ id, label, isCompleted, updateDodo }: Props) => (
  <div className="flex items-center">
    <RadixCheckbox.Root
      className="border-primary flex h-5 w-5 appearance-none items-center
        justify-center rounded-[4px] border-2 border-solid outline-none 
        "
      onClick={() => updateDodo(!isCompleted)}
      checked={isCompleted}
    >
      <RadixCheckbox.Indicator className="text-accent">
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
    <span
      className={`flex-grow pl-[15px] text-[15px] text-lg leading-none ${isCompleted ? 'line-through' : ''}`}
    >
      {label}
    </span>
  </div>
);

export default Checkbox;
