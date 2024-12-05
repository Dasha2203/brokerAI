import clsx from 'clsx';
import { Props } from './types';

const Th = ({ style, className, children }: Props) => {
  return (
    <th
      style={style}
      className={clsx(
        'first:pl-10 last:pr-14 text-black font-bold pt-8 pb-6',
        'first:rounded-tl-xl last:rounded-tr-xl',
        // light
        'bg-white',
        // dark
        'dark:bg-violet-800 dark:text-white',
        className,
      )}
    >
      {children}
    </th>
  );
};

export default Th;
