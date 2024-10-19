import { InputProps as InputCommonProps } from '@/components/types';
import { InputHTMLAttributes } from 'react';

export type InputProps = InputCommonProps<string> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'value'> & {
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    error?: string;
  };
