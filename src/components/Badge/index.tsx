import clsx from 'clsx';
import { Props } from './types';

const Badge = ({ text, color, className, size = 'base' }: Props) => {
  return (
    <div
      className={clsx(
        'rounded-[14px] w-fit  font-bold',
        {
          'bg-[#D8FFE0] text-green': color === 'green',
          'bg-[#ffd3d6] text-red': color === 'red',
          'py-3 px-5 text-base': size === 'base',
          'py-1 px-2 text-xs': size === 'xs',
        },
        className,
      )}
    >
      {text}
    </div>
  );
};

export default Badge;
