import clsx from 'clsx';
import Link from 'next/link';

import {
  AnchorProps,
  ButtonColor,
  ButtonProps,
  ButtonVariant,
  CustomButtonProps,
} from './types';
import LoadingIcon from '@/icons/LoadingIcon';

const Button = ({
  as,
  uiColor,
  variant = 'outlined',
  size = 'md',
  isLoading = false,
  fixedSize = false,
  leftIcon: LeftIcon,
  ...props
}: CustomButtonProps) => {
  const commonStyles = clsx(
    {
      ...(fixedSize
        ? {
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-xl': size === 'lg',
          }
        : {
            'text-sm': size === 'sm',
            'text-sm md:text-base': size === 'md',
            'text-base md:text-xl': size === 'lg',
          }),
    },
    // fixedSize
    //   //fixed sizes
    //   ? size === 'md'
    //     ? 'text-base'
    //     : size === 'lg'
    //       ? 'text-xl'
    //       : 'text-sm'

    //   : size === 'sm'
    //     ? 'text-sm'
    //     : size === 'base'

    'text-lg',
    'flex justify-center text-center transition-all duration-500 font-bold',
    'rounded-[14px] py-1.5 px-2.5 md:py-3 md:px-5 border-2',
    {
      'shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]': !(
        variant === 'contained' && !uiColor
      ),
      'border-transparent': variant === 'contained' && !uiColor,
      'text-white border-transparent':
        (uiColor === 'primary' ||
          uiColor === 'danger' ||
          uiColor === 'green') &&
        variant === 'contained',
      'text-violet-700': variant === 'outlined',
    },
  );

  const colorsScheme: {
    [key in ButtonColor]: {
      [key in ButtonVariant]: string;
    };
  } = {
    primary: {
      contained: clsx('bg-violet-700 ring-violet-600', 'hover:bg-violet-600'),
      outlined: clsx(
        'border-violet-700 text-violet-700 ring-violet-600',
        'hover:text-white hover:bg-violet-600 hover:bg-violet-600',
      ),
    },
    danger: {
      contained: clsx('bg-red ring-red', 'hover:opacity-90 transition:opacity'),
      outlined: clsx(
        'border-red-500 text-red-500 ring-red-400',
        'hover:text-white hover:border-red-500 hover:bg-red-500 hover:shadow-red-200',
      ),
    },
    green: {
      contained: clsx(
        'bg-green ring-green',
        'hover:opacity-90 transition:opacity',
      ),
      outlined: clsx(
        'border-red-500 text-red-500 ring-red-400',
        'hover:text-white hover:border-green hover:bg-red-500 hover:shadow-green',
      ),
    },
  };

  if (as === 'link') {
    const { href, children, className, ...rest } = props as AnchorProps;
    const isInternal = href.startsWith('/');

    if (isInternal) {
      return (
        <Link href={href} passHref legacyBehavior>
          <a
            className={clsx(
              'hover:shadow-lg active:ring',
              commonStyles,
              uiColor && variant ? colorsScheme[uiColor][variant] : null,

              className,
            )}
            {...rest}
          >
            {children}
          </a>
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={clsx(
          'hover:shadow-lg active:ring',
          commonStyles,
          uiColor && variant ? colorsScheme[uiColor][variant] : null,

          className,
        )}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const {
    disabled,
    className,
    type = 'button',
    children,
    ...rest
  } = props as ButtonProps;

  return (
    <button
      className={clsx(
        commonStyles,
        uiColor && variant && !disabled ? colorsScheme[uiColor][variant] : null,

        className,
        {
          '!bg-gray-300 !text-white !cursor-default':
            disabled && variant === 'contained',
          '!border-gray-300 !text-gray-300 !cursor-default':
            disabled && variant === 'outlined',
          'hover:shadow-lg active:ring': !disabled,
        },
      )}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <LoadingIcon className="w-8 h-8 animate-spin mx-auto" />
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-7 h-7" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
