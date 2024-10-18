import React, { forwardRef } from "react"
import { InputProps } from "./types";
import clsx from "clsx";

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className, ...props }, ref) => {

  return (
    <div>
      {label && (
        <label className="mb-3.5 block font-bold text-[#C7C7C7] uppercase">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          // dark
          'dark:bg-transparent dark:border-violet-300',
          // light
          'bg-[#F5F5F5] border-transparent',
          'py-3 px-6',
          'rounded-xl focus:border-violet-700 hover:border-violet-600 outline-none border-2 transition-colors',
          'text-lg',
          className
        )}
        {...props}
      />
    </div>

  )
});

export default Input;
