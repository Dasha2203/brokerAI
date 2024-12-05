import React from 'react';
import clsx from 'clsx';
import { Props } from './types';

const THeadRow = ({ style, className, children, ...props }: Props) => {
  return (
    <tr
      className={clsx(
        'border-b-2 last:border-b-0 transition-shadow',
        // light
        'border-[#F4F4F4]',
        // dark
        'dark:border-violet-400 ',
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </tr>
  );
};

export default THeadRow;
