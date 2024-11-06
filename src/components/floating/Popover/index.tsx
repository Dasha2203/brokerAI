import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from '@floating-ui/react';
import React from 'react';
import { Props } from './types';

const Popover = ({ children }: Props) => {
  return (
    <FloatingPortal>
      <FloatingOverlay lockScroll>
        <FloatingFocusManager>{children}</FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

export default Popover;
