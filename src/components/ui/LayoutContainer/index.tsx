import { forwardRef } from 'react';
import clsx from 'clsx';
import { Props } from './types';

const LayoutContainer = forwardRef<HTMLDivElement, Props>(
  ({ children, style, className }, forwardRef) => (
    <div
      style={style}
      className={clsx(
        className,
        'mx-auto w-full px-4 lg:px-8 max-w-[1376px] pt-36',
      )}
      ref={forwardRef}
    >
      {children}
    </div>
  ),
);

LayoutContainer.displayName = 'LayoutContainer';

export default LayoutContainer;
