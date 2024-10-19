import React from 'react';
import { Props } from './types';

const FormField = ({ label, children, ...props }: Props) => {
  return (
    <div {...props}>
      {label && (
        <label className="mb-3.5 font-Open-Sans block font-bold text-[#C7C7C7] uppercase">
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

export default FormField;
