import React, { useEffect } from 'react';
import LayoutContainer from '../LayoutContainer';
import { Props } from './types';
import clsx from 'clsx';

const PageContainer = ({ className, style, children }: Props) => {
  return (
    <LayoutContainer
      className={clsx('pt-[76px] md:pt-30 mt-4 md:mt-8', className)}
      style={style}
    >
      {children}
    </LayoutContainer>
  );
};

export default PageContainer;
