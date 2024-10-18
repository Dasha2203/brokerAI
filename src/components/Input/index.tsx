import React, { forwardRef } from 'react';
import { InputProps } from './types';
import clsx from 'clsx';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="mb-3.5 block font-bold text-[#C7C7C7] uppercase">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            // dark
            'dark:bg-transparent dark:border-violet-300',
            // light
            'bg-[#F5F5F5] border-transparent',
            'py-1.5 px-3 md:py-3 md:px-6',
            'rounded-xl focus:border-violet-700 hover:border-violet-600 outline-none border-2 transition-colors',
            'text-lg md:text-xl',
            className,
            {
              'border-red hover:border-red focus:border-red': !!error,
            },
          )}
          {...props}
        />
        {error && (
          <span className="mt-3 text-sm block text-red font-semibold">
            {error}
          </span>
        )}
      </div>
    );
  },
);

export default Input;
