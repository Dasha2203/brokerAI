import clsx from 'clsx';
import { Props } from './types';

const Th = ({ style, className, children }: Props) => {
  return (
    <div
      style={style}
      className={clsx(
        'first:pl-10 last:pr-14 text-black font-bold pt-8 pb-6',
        'dark:text-white',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Th;
