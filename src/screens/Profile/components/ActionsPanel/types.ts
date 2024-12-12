import { BillinInfo } from '@/api/user';
import { IUser } from '@/models/IUser';
import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  billingInfo: BillinInfo | null;
  user: IUser;
};