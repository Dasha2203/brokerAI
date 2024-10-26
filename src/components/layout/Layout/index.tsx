import React from 'react';
import Header from '../Header';
import { Props } from './types';

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
