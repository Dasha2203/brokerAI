import { ModalProps } from '@/components/Modal/types';

export type Props = Omit<ModalProps, 'children'> & {
  amount: string;
  setAmount: (value: string) => void;
  onSubmit: () => Promise<void>;
  buttonText: string;
};
