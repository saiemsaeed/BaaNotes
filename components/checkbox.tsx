import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { Flex, IconButton, Text } from '@radix-ui/themes';
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
      className="border-accentLight bg-accentLight flex h-[24px] w-[24px] appearance-none
        items-center justify-center rounded-[4px] border-2 border-solid outline-none 
        "
      onClick={() => updateDodo(!isCompleted)}
      checked={isCompleted}
    >
      <RadixCheckbox.Indicator className="text-accentDark">
        <CheckIcon />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
    <Text
      className={`flex-grow pl-[15px] font-mono text-[15px] text-lg leading-none ${isCompleted ? 'line-through' : ''}`}
      htmlFor="c1"
    >
      {label}
    </Text>
  </Flex>
);

export default Checkbox;
