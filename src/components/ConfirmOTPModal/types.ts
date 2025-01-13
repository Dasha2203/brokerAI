import { IUser } from '@/models/IUser';
import { ModalProps } from '../Modal/types';

export type Props = Omit<ModalProps, 'children'> & {
  codeKey?: string;
  onSubmit: () => Promise<void>;
  user?: IUser;
};
