import clsx from 'clsx';
import { Props } from './types';

const Badge = ({ text, color }: Props) => {
  return (
    <div
      className={clsx('rounded-[14px] w-fit py-3 px-5 text-base font-bold', {
        'bg-[#D8FFE0] text-green': color === 'green',
        'bg-[#ff969d] text-red': color === 'red',
      })}
    >
      {text}
    </div>
  );
};

export default Badge;
