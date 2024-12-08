import clsx from 'clsx';
import { Props } from './types';
import ListItem from './ListItem';

const List = ({ list, className, style }: Props) => {
  if (!list.length) return null;

  return (
    <ul className={clsx(className)} style={style}>
      {list.map((item, idx) => (
        <ListItem key={idx} item={item} />
      ))}
    </ul>
  );
};

export default List;
