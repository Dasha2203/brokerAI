import clsx from "clsx"
import Link from "next/link"

import { AnchorProps, ButtonColor, ButtonProps, ButtonVariant, CustomButtonProps } from "./types"

const Button = ({
  as,
  uiColor,
  variant,
  size = 'md',
  fixedSize = false,
  ...props
}: CustomButtonProps) => {

  const commonStyles = clsx(
    {
      ...(fixedSize
        ? {
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-xl': size === 'lg'
        } : {
          'text-sm': size === 'sm',
          'text-sm md:text-base': size === 'md',
          'text-base md:text-xl': size === 'lg'
        })
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
    'text-center transition-all duration-500 font-bold',
    'rounded-xl py-3 px-5 border-2 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]',
    variant === 'contained' && 'border-transparent text-white'
  )

  const colorsScheme: {
    [key in ButtonColor]: {
      [key in ButtonVariant]: string
    }
  } = {
    primary: {
      contained: clsx(
        'bg-violet-700 ring-violet-600',
        'hover:bg-violet-600'
      ),
      outlined: clsx(
        'border-violet-700 text-violet-700 ring-violet-600',
        'hover:text-white hover:bg-violet-600 hover:bg-violet-600',
      )
    },
    danger: {
      contained: clsx(
        'bg-red-600 ring-red-400',
        'hover:shadow-red-200 hover:bg-red-500',
      ),
      outlined: clsx(
        'border-red-500 text-red-500 ring-red-400',
        'hover:text-white hover:border-red-500 hover:bg-red-500 hover:shadow-red-200'

      )
    }
  }

  if (as === 'link') {
    const { href, children, className, ...rest } = props as AnchorProps
    const isInternal = href.startsWith('/')

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
      )
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
    )
  }

  const { disabled, className, type = 'button', children, ...rest } = props as ButtonProps

  return (
    <button
      className={clsx(
        commonStyles,
        uiColor && variant && !disabled ? colorsScheme[uiColor][variant] : null,

        className,
        {
          'bg-gray-300 text-white cursor-default': disabled && variant === 'contained',
          'border-gray-300 text-gray-300 cursor-default': disabled && variant === 'outlined',
          'hover:shadow-lg active:ring': !disabled,
        }
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button