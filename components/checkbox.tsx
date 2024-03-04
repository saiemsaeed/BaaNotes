import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

interface Props {
  isCompleted: boolean;
  updateDodo: (isComplete: boolean) => void;
}

const Checkbox = ({ isCompleted, updateDodo }: Props) => (
  <RadixCheckbox.Root
    className="flex h-5 w-5 appearance-none items-center justify-center
        rounded-[4px] border-2 border-solid border-muted outline-none 
        "
    onClick={() => updateDodo(!isCompleted)}
    checked={isCompleted}
  >
    <RadixCheckbox.Indicator className="text-accent">
      <CheckIcon />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
);

export default Checkbox;
