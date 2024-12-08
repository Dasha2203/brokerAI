'use client';
import LanguageBtn from '@/components/buttons/LanguageBtn';
import ThemeButton from '@/components/buttons/ThemeButton';
import useDeviceType from '@/hooks/useDeviceType';
import DollarIcon from '@/icons/DollarIcon';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react';

const navLinks = [
  {
    link: '/tickers',
    label: 'tickers',
  },
  {
    link: '/stockpacks',
    label: 'stockpacks',
  },
  {
    link: '/requests',
    label: 'requests',
  },
];

const Header = () => {
  const t = useTranslations('navigation');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { isDeviceType } = useDeviceType({ width: 720 });

  function handleOpenMenu() {
    setIsOpenMenu((prev) => !prev);
    document.body.classList.toggle('no-scroll');
  }
  return (
    <header
      className={clsx(
        'py-3 md:py-7 fixed top-0 right-0 left-0 z-10',
        'bg-white shadow-[0px_1px_8px_0px_rgba(0,0,0,.1)]',
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
        <nav
          className={clsx(
            // mobile
            'fixed top-[76px] pt-12 inset-0 flex justify-center text-center transition-transform duration-300',
            {
              'translate-x-full': !isOpenMenu,
            },
            // desktop
            'md:ml-auto md:mr-14 md:static md:translate-x-0 md:pt-0',
            // light
            'bg-white',
            // dark
            'dark:bg-violet-800',
          )}
        >
          <ul
            className={clsx(
              'flex flex-col md:flex-row gap-4 font-bold md:gap-10',
            )}
          >
            {navLinks.map((link, idx) => (
              <li className="block" onClick={handleOpenMenu}>
                <Link
                  key={idx}
                  href={link.link}
                  className={clsx(
                    'block text-xl py-4 transition-colors',
                    'text-gray-300 hover:text-violet-600',
                    'dark:text-white dark:hover:text-violet-100',
                  )}
                >
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* <div className="ml-auto flex"> */}
        <LanguageBtn className="ml-auto md:ml-0" />
        <ThemeButton />
        {isDeviceType ? (
          <button
            className={clsx('ml-6 burger', isOpenMenu && 'burger-active')}
            onClick={handleOpenMenu}
          >
            <span></span>
          </button>
        ) : null}
        {/* </div> */}
      </div>
    </header>
  );
};

export default Header;
