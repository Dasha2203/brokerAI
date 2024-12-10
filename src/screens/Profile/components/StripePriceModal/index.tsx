import Modal from '@/components/Modal';
import { Props } from './types';
import { useTranslations } from 'next-intl';
import StripePricingTable from '../StripePricingTable';

const StripePriceModal = ({
  sessionSecret,
  pricingTableId,
  publishableKey,
  ...props
}: Props) => {
  const t = useTranslations('profile');

  return (
    <Modal
      header={t('subscription')}
      className="lg:w-full lg:max-w-[1200px]"
      {...props}
    >
      <StripePricingTable
        sessionSecret={sessionSecret}
        pricingTableId={pricingTableId}
        publishableKey={publishableKey}
      />
    </Modal>
  );
};

export default StripePriceModal;
