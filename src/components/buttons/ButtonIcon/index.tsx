import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Props } from './types';

const ButtonIcon = forwardRef<HTMLButtonElement, Props>(
  ({ icon: Icon, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'text-gray-300 hover:text-gray-200',
        'dark:text-violet-300 dark:hover:text-violet-100',
        'p-3 transition-colors',
      )}
      {...props}
    >
      <Icon className="w-7 h-7" />
    </button>
  ),
);

export default ButtonIcon;
