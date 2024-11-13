import React from 'react';
import { Props } from './types';
import clsx from 'clsx';

const Table = ({ style, children, className }: Props) => {
  return (
    <div
      style={style}
      className={clsx(
        'rounded-[14px]',
        'bg-white ',
        'dark:bg-violet-800 dark:text-white',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Table;
