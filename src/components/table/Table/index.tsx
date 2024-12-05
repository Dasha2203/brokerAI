import React from 'react';
import clsx from 'clsx';
import { Props } from './types';

const Table = ({ style, children, className }: Props) => {
  return (
    <table
      style={style}
      className={clsx(
        'rounded-[14px] w-full',
        // light
        'bg-white',
        // dark
        'dark:bg-violet-800 dark:text-white',
        className,
      )}
    >
      {children}
    </table>
  );
};

export default Table;
