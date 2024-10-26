import clsx from 'clsx';
import React from 'react';
import { Props } from './types';

const ButtonIcon = ({ icon: Icon, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'text-gray-300 hover:text-gray-200',
        'dark:text-violet-300 dark:hover:text-violet-100',
        'p-3 transition-colors',
      )}
      {...props}
    >
      <Icon className="w-7 h-7" />
    </button>
  );
};

export default ButtonIcon;
