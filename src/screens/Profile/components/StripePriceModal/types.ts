import { ModalProps } from '@/components/Modal/types';
import { Props as StripeProps } from '../StripePricingTable/types';

export type Props = Omit<ModalProps, 'children'> & StripeProps;
