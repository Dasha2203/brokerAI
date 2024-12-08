import React from 'react';
import LayoutContainer from '../LayoutContainer';
import { Props } from './types';
import clsx from 'clsx';

const PageContainer = ({ className, style, children }: Props) => {
  return (
    <LayoutContainer
      className={clsx('pt-30 md:pt-40 pb-20', className)}
      style={style}
    >
      {children}
    </LayoutContainer>
  );
};

export default PageContainer;
