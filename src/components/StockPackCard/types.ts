import { IStockPack } from '@/models/IStockPack';
import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  data: IStockPack;
};
