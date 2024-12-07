import React from 'react';
import clsx from 'clsx';
import { Props } from './types';
import Caption from '../Caption';

const Table = ({ caption, style, children, className }: Props) => {
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
      {caption && <Caption text={caption} />}
      {children}
    </table>
  );
};

export default Table;
