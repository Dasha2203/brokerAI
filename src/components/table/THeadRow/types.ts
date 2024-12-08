import { HTMLAttributes } from 'react';
import { StyledProps } from '@/types/ui';

export type Props = StyledProps &
  HTMLAttributes<HTMLTableRowElement> & {
    children: React.ReactNode;
  };
