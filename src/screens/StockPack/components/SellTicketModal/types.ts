import { SpecificStockPack } from '@/api/stockpack';
import { ModalProps } from '@/components/Modal/types';

export type Props = Omit<ModalProps, 'children'> & {
  item: SpecificStockPack;
};
