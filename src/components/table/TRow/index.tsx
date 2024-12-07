import React from 'react';
import { Props } from './types';
import clsx from 'clsx';

const Trow = ({ style, className, children, ...props }: Props) => {
  return (
    <tr
      className={clsx(
        'relative hover:z-[1] border-b-2 last:border-b-0 transition-shadow overflow-hidden',
        'last:rounded-bl-xl last:rounded-br-xl',
        // light
        'border-[#F4F4F4] hover:shadow-[0_1px_28px_0_rgba(0,0,0,.12)]',
        // dark
        'dark:border-violet-400 dark:hover:shadow-[0_1px_28px_0_rgba(255,255,255,.12)]',
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </tr>
  );
};

export default Trow;
