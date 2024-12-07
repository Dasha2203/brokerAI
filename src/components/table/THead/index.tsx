import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Props } from './types';
import useChangeSize from '@/hooks/useChangeSize';

const THead = ({ children, className, style, ...props }: Props) => {
  const [top, setTop] = useState(0);

  const { width: windowWidth } = useChangeSize();

  useEffect(() => {
    const header = document.querySelector('header');
    setTop(header?.clientHeight || 0);
  }, [windowWidth]);

  return (
    <thead
      className={clsx(
        'sticky top-[400px] z-50 shadow-[0px_2px_0px_0px]',
        // light
        'shadow-[rgba(244,244,244,1)]',
        // dark
        'dark:shadow-violet-400',
        className,
      )}
      style={{
        top,
        ...style,
      }}
      {...props}
    >
      {children}
    </thead>
  );
};

export default THead;
