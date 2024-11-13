import { ModalProps } from '@/components/Modal/types';

export type Props = Omit<ModalProps, 'children'> & {
  email?: string;
};
