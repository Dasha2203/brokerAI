import ThemeButton from '@/components/buttons/ThemeButton';
import clsx from 'clsx';
import React from 'react';

const Header = () => {
  return (
    <header
      className={clsx(
        'py-7 fixed top-0 right-0 left-0 z-10',
        'bg-white',
        'dark:bg-violet-800',
      )}
    >
      <div className="flex justify-between items-center mx-auto w-full px-4 lg:px-8 max-w-[1376px]">
        <div className="font-bold text-2xl">Logo</div>
        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
