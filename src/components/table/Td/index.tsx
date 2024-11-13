import clsx from 'clsx';
import { Props } from './types';

const Td = ({ style, className, children }: Props) => {
  return (
    <div
      style={style}
      className={clsx(
        'first:pl-7 last:pr-14 text-black pt-8 pb-6',
        'dark:text-white',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Td;
