import React from 'react';
import { Props } from './types';
import Lottie from 'lottie-react';
import successAnimation from '@/animations/success.json';

const SuccessQuery = ({ message, children }: Props) => {
  return (
    <div className="text-center my-auto">
      <Lottie
        loop={false}
        animationData={successAnimation}
        className="w-32 h-32 md:w-48 md:h-48 mx-auto"
      />
      <div className="mt-3 text-xl md:text-3xl font-bold text-center">
        Success!
      </div>
      <p className="mt-2 text-base md:text-xl">{message}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default SuccessQuery;
