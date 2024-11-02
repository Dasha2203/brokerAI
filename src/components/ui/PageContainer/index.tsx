import React from 'react';
import LayoutContainer from '../LayoutContainer';
import { Props } from './types';
import clsx from 'clsx';

const PageContainer = ({ className, style, children }: Props) => {
  return (
    <LayoutContainer
      className={clsx('pt-[92px] md:pt-[138px]', className)}
      style={style}
    >
      {children}
    </LayoutContainer>
  );
};

export default PageContainer;
