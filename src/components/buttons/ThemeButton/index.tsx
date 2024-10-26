'use client';
import React, { useState } from 'react';
import ButtonIcon from '../ButtonIcon';
import NightIcon from '@/icons/NightIcon';
import LightIcon from '@/icons/LightIcon';

const ThemeButton = () => {
  const [isDark, setIsDark] = useState(true);

  function handleClick() {
    setIsDark((prev) => !prev);
    document.body.classList.toggle('dark');
  }

  return (
    <ButtonIcon
      icon={isDark ? NightIcon : LightIcon}
      onClick={handleClick}
      aria-label="Toggle theme"
    />
  );
};

export default ThemeButton;
