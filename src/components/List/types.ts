import { HTMLAttributes } from 'react';

export type ListData = {
  label: string;
  value: string;
};

export type Props = HTMLAttributes<HTMLUListElement> & {
  list: ListData[];
};

export type ListItemProps = {
  item: ListData;
};
