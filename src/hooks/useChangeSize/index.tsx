import { useEffect, useState } from 'react';

const useChangeSize = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleChangeSize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleChangeSize);
    handleChangeSize();

    return () => {
      window.removeEventListener('resize', handleChangeSize);
    };
  }, []);

  return {
    width,
  };
};

export default useChangeSize;
