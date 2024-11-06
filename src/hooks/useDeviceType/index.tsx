import { useEffect, useState } from 'react';
import { Props } from './types';

const useDeviceType = ({ width }: Props) => {
  const [isDeviceType, setIsDeviceType] = useState(false);

  useEffect(() => {
    function handleChangeSize() {
      setIsDeviceType(window.innerWidth < width);
    }

    window.addEventListener('resize', handleChangeSize);
    handleChangeSize();

    return () => {
      window.removeEventListener('resize', handleChangeSize);
    };
  }, []);

  return {
    isDeviceType,
  };
};

export default useDeviceType;
