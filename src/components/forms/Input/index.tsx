import React, { forwardRef } from 'react';
import { InputProps } from './types';
import clsx from 'clsx';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      isInvalid = false,
      value,
      error,
      onChange,
      style,
      className,
      rightIcon,
      leftIcon,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={clsx(className, 'font-Open-Sans')} style={style}>
        <div className="relative">
          {leftIcon && (
            <div
              style={{
                top: '50%',
                left: 0,
                transform: 'translate3d(50%, -50%, 0)',
              }}
              className="absolute"
            >
              {leftIcon}
            </div>
          )}
          <input
            {...rest}
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
            value={value === null ? '' : value}
            onChange={(event) => {
              onChange(event.target.value ? event.target.value : null);
            }}
          />

          {rightIcon && (
            <div
              style={{
                top: '50%',
                right: 0,
                transform: 'translate3d(-50%, -50%, 0)',
              }}
              className="absolute"
            >
              {rightIcon}
            </div>
          )}
        </div>

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
