import { Box } from '@radix-ui/themes';
import { on } from 'events';
import { PropsWithChildren, useRef } from 'react';

interface ListItemProps extends React.ComponentPropsWithoutRef<'div'> {
  onTap?: () => void;
  onDoubleTap?: () => void;
}

const ListItem = ({
  children,
  onDoubleTap,
  ...props
}: PropsWithChildren<ListItemProps>) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  // Function to handle tap
  const handleTap = () => {
    let tapCount = 0; // Initialize tap count
    let tapTimer: NodeJS.Timeout; // Initialize tap timer

    return () => {
      tapCount++; // Increase tap count

      // If it's the first tap, start the timer
      if (tapCount === 1) {
        tapTimer = setTimeout(() => {
          // Reset tap count after 500ms
          console.log('object 1 timer');
          tapCount = 0;
        }, 500);
      } else if (tapCount === 2) {
        // If it's the second tap within 500ms, trigger the custom event
        onDoubleTap && onDoubleTap();
        clearTimeout(tapTimer); // Clear the timer
        tapCount = 0; // Reset tap count
      }
    };
  };

  return (
    <Box
      ref={buttonRef}
      // onClick={handleTap()}
      onTouchEnd={handleTap()}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ListItem;
