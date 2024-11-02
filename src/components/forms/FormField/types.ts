import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  rightNode?: React.ReactNode;
  error?: string | React.ReactNode;
};
