'use client';
import React from 'react';
import Input from '../forms/Input';
import { CustomInputProps } from './types';

const CustomInput = ({
  placeholder,
  onClick,
  className,
  ref,
}: CustomInputProps) => {
  function onClickHandler(event: React.MouseEvent<HTMLElement>) {
    onClick && onClick(event);
  }

  return (
    <Input
      value={placeholder}
      onClick={(e) => onClickHandler(e)}
      onChange={() => {}}
      className={className}
    />
  );
};

export default CustomInput;
