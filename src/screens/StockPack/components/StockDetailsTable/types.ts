import { SpecificStockPack } from '@/api/stockpack';
import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  items: SpecificStockPack[];
};

export type ItemProps = {
  item: SpecificStockPack;
  keys: (keyof SpecificStockPack)[];
};
