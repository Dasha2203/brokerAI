import clsx from 'clsx';
import { Props } from './types';

const Item = ({ children, ...props }: Props) => {
  return (
    <div
      className={clsx(
        'mx-auto [&:not(:first-child)]:mt-6 py-8 px-5 rounded-[14px] ',
        // light
        'bg-white',
        // dark
        'dark:bg-violet-800',
      )}
    >
      {children}
    </div>
  );
};

export default Item;
