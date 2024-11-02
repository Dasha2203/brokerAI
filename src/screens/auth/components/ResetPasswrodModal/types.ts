import { ModalProps } from '@/components/Modal/types';

export type Props = Omit<ModalProps, 'children'> & {
  email?: string;
};

export type ContentResetPassword = 'form' | 'success' | 'error';
