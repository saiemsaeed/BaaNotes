import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Flex, Text } from '@radix-ui/themes';
import { Dodo } from '@/models/doto';

interface Props {
  id: string;
  label: string;
  isCompleted: boolean;
  updateDodo: (isComplete: boolean) => void;
}

const Checkbox = ({ id, label, isCompleted, updateDodo }: Props) => (
  <Flex align="center">
    <RadixCheckbox.Root
      className="flex h-[25px] w-[25px] appearance-none items-center justify-center
        rounded-[4px] border-2 border-solid border-background bg-white outline-none hover:bg-violet3
        "
      onClick={() => updateDodo(!isCompleted)}
      checked={isCompleted}
    >
      <RadixCheckbox.Indicator className="text-violet11">
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
    <Text
      className={`pl-[15px] font-mono text-[15px] text-lg leading-none ${isCompleted ? 'line-through' : ''}`}
      htmlFor="c1"
    >
      {label}
    </Text>
  </Flex>
);

export default Checkbox;
