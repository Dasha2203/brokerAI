import React from 'react';
import Lottie from 'lottie-react';
import failedAnimation from '@/animations/failed.json';
import { Props } from './types';
import clsx from 'clsx';

const DefaultError = ({ error, className, style }: Props) => {
  return (
    <div className={clsx('text-center', className)} style={style}>
      <Lottie
        loop={false}
        animationData={failedAnimation}
        className="w-32 h-32 md:w-48 md:h-48 mx-auto"
      />
      <div className="mt-3 text-xl md:text-3xl font-bold text-center">
        Error
      </div>
      <p className="mt-2 text-base md:text-xl">
        {error?.message ?? 'Something went wrong'}
      </p>
    </div>
  );
};

export default DefaultError;
