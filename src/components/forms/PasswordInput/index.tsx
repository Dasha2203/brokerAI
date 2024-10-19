import React, { useState } from 'react';
import Input from '../Input';
import { InputProps } from '../Input/types';
import EyeOpenIcon from '@/icons/EyeOpenIcon';
import EyeCloseIcon from '@/icons/EyeCloseIcon';

const iconProps = {
  width: '24px',
  height: '24px',
  className: 'text-violet-700 transition-all hover:text-violet-600 ',
};

const PasswordInput = (props: InputProps) => {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow((prev) => !prev);
  }

  return (
    <div className={'relative'}>
      <Input
        type={show ? 'text' : 'password'}
        {...props}
        rightIcon={
          <div
            className="absolute cursor-pointer"
            onClick={handleClick}
            style={{
              top: '50%',
              right: 0,
              transform: 'translate3d(-50%, -50%, 0)',
            }}
          >
            {show ? (
              <EyeOpenIcon {...iconProps} />
            ) : (
              <EyeCloseIcon {...iconProps} />
            )}
          </div>
        }
      />
    </div>
  );
};

export default PasswordInput;
