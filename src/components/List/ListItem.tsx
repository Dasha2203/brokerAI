import clsx from 'clsx';
import { ListItemProps } from './types';

const ListItem = ({ item: { value, label } }: ListItemProps) => {
  return (
    <li
      className={clsx(
        'my-1 py-2 flex justify-between text-lg border-b-2',
        // light
        'border-[#F4F4F4]',
        // dark
        'dark:border-violet-300',
      )}
    >
      <span className="font-bold">{label}</span>
      <span>{value}</span>
    </li>
  );
};

export default ListItem;
