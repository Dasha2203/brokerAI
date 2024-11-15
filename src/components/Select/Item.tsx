import clsx from 'clsx';
import React from 'react';

const Item = ({
  children,
  active = false,
  value,
  onClick,
}: {
  value: string;
  children: React.ReactNode;
  active?: boolean;
  onClick: (value: string) => void;
}) => {
  function handleChange() {
    onClick(value);
  }

  return (
    <li>
      <button
        className={clsx(
          'px-6 py-2 cursor-pointer font-bold w-full transition-colors text-left',
          {
            'text-violet-700 bg-[#F6EEFF] dark:text-white dark:bg-violet-300':
              active,
            'text-gray-300 hover:text-violet-700 dark:hover:text-white':
              !active,
          },
        )}
        onClick={handleChange}
      >
        {children}
      </button>
    </li>
  );
};

export default Item;
