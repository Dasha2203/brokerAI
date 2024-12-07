import { TableHTMLAttributes } from 'react';

export type Props = TableHTMLAttributes<HTMLTableElement> & {
  caption?: string;
};
