import { HTMLAttributes } from 'react';
import { SpecificStockPack } from '@/api/stockpack';

export type Props = HTMLAttributes<HTMLDivElement> & {
  price: string;
  item: SpecificStockPack;
  setPrice: (value: string) => void;
  handleSubmit: () => Promise<void>;
};
