import React from 'react';
import { Props } from './types';
import clsx from 'clsx';

const Trow = ({ style, className, children }: Props) => {
  return (
    <div
      className={clsx(
        'grid border-b-2 border-[#F4F4F4] last:border-b-0',
        'dark:border-violet-400',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default Trow;
