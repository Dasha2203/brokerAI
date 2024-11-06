import clsx from 'clsx';
import NextLink from 'next/link';

import { AnchorProps, ButtonProps, CustomLinkProps } from './types';

const Link = ({
  as,
  uiColor = 'primary',
  size = 'md',
  fixedSize = false,
  ...props
}: CustomLinkProps) => {
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
    'text-center transition-colors',
  );

  if (as === 'link') {
    const { href, children, className, ...rest } = props as AnchorProps;
    const isInternal = href.startsWith('/');

    if (isInternal) {
      return (
        <NextLink href={href} passHref legacyBehavior>
          <a
            className={clsx(
              commonStyles,
              {
                'text-violet-600': uiColor === 'primary',
              },

              className,
            )}
            {...rest}
          >
            {children}
          </a>
        </NextLink>
      );
    }

    return (
      <a
        href={href}
        className={clsx(
          commonStyles,
          {
            'text-violet-700': uiColor === 'primary',
          },
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
        className,

        {
          'text-gray-300 cursor-default': disabled,

          'text-violet-700': uiColor === 'primary',
        },
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Link;
