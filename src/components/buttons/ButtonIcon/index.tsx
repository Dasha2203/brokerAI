import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Props } from './types';

const ButtonIcon = forwardRef<HTMLButtonElement, Props>(
  ({ icon: Icon, color = 'default', active = false, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'text-gray-300 hover:text-gray-200',
        'dark:text-violet-300 dark:hover:text-violet-100',
        'p-3 transition-colors',
      )}
      {...props}
    >
      <Icon
        className={clsx(
          'w-7 h-7',
          active
            ? color === 'yellow'
              ? 'fill-yellow text-yellow'
              : 'fill-violet-700 text-violet-700'
            : '',
        )}
      />
    </button>
  ),
);

export default ButtonIcon;
