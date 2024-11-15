'use client';
import LanguageBtn from '@/components/buttons/LanguageBtn';
import ThemeButton from '@/components/buttons/ThemeButton';
import DollarIcon from '@/icons/DollarIcon';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header
      className={clsx(
        'py-3 md:py-7 fixed top-0 right-0 left-0 z-10',
        'bg-white',
        'dark:bg-violet-800',
      )}
    >
      <div className="flex justify-between items-center mx-auto w-full px-4 lg:px-8 max-w-[1376px]">
        <div className="font-bold text-2xl flex">
          <Link href="/" className="flex gap-2 items-center font-Cairo">
            <DollarIcon className="text-yellow w-10 h-10" />
            MYMoney
          </Link>
        </div>
        <LanguageBtn className="ml-auto" />
        {/* <Select /> */}
        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
