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
      size = 'base',
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
                left: 34,
                transform: 'translateY(-50%)',
              }}
              className="absolute w-7 h-7"
            >
              {leftIcon}
            </div>
          )}
          <input
            {...rest}
            ref={ref}
            className={clsx(
              // dark
              'dark:bg-transparent ',
              // light
              'bg-[#F5F5F5]',
              leftIcon ? 'pl-[86px]' : 'pl-3 md:pl-6',
              rightIcon ? 'pr-[62px]' : 'pr-3 md:pr-6',
              size === 'lg' ? 'pt-5 pb-4' : 'py-1.5',
              // size === 'lg',
              //   ? 'py-5'
              //   : 'py-1.5',
              'rounded-xl  outline-none border-2 transition-colors',
              'text-lg md:text-xl',
              className,
              {
                'border-transparent dark:border-violet-300 focus:border-violet-700 hover:border-violet-600': !error,
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
                transform: 'translateY(-50%)',
              }}
              className="absolute"
            >
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default Input;
