import clsx from 'clsx';
import { Props } from './types';

const Td = ({ style, className, children }: Props) => {
  return (
    <td
      style={style}
      className={clsx(
        'first:pl-7 last:pr-14 text-black py-5',
        // light
        'bg-white',
        // dark
        'dark:text-white dark:bg-violet-800',
        className,
      )}
    >
      {children}
    </td>
  );
};

export default Td;
