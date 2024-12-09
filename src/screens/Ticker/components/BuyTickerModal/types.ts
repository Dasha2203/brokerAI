import { ModalProps } from '@/components/Modal/types';
import { ITicker } from '@/models/ITicker';

export type Props = Omit<ModalProps, 'children'> & {
  item: ITicker;
  tickerId: string;
};
