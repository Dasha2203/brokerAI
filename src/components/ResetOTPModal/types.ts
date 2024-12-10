import { ModalProps } from '../Modal/types';

export type Props = Omit<ModalProps, 'children'> & {
  onSubmit: () => Promise<void>;
  email: string;
};
