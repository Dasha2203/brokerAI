import React from 'react';
import { Props } from './types';

const FormField = ({ label, error, rightNode, children, ...props }: Props) => {
  return (
    <div {...props}>
      {label && (
        <div className="mb-3.5 flex justify-between items-center">
          <label className="font-Open-Sans block font-bold text-[#C7C7C7] uppercase">
            {label}
          </label>
          {rightNode || null}
        </div>
      )}
      {children}
      {error && (
        <div className="mt-3.5 text-sm text-red font-semibold">{error}</div>
      )}
    </div>
  );
};

export default FormField;
