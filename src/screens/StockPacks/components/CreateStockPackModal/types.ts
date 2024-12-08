import { ModalProps } from '@/components/Modal/types';
import { IStockPack } from '@/models/IStockPack';

export type Props = Omit<ModalProps, 'children'> & {
  data?: Partial<IStockPack>;
};
