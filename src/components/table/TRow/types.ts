import { StyledProps } from '@/types/ui';
import { HTMLAttributes } from 'react';

export type Props = StyledProps &
  HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  };
