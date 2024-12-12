import DefaultError from '@/components/errors/DefaultError';
import List from '@/components/List';
import Modal from '@/components/Modal';
import { ITicker } from '@/models/ITicker';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getFormatValue } from '../../getFormatValue';
import BuyTickerForm from '../BuyTickerForm';
import { Props } from './types';

const BuyTickerModal = ({ item, tickerId, ...props }: Props) => {
  const t = useTranslations('tickers');

  const infoList = useMemo(() => {
    if (!item) return [];
    const keys: (keyof ITicker)[] = [
      'actualPrice',
      'industryKey',
      'sectorKey',
      'ticker',
    ];
    return keys.map((key) => ({
      label: t(`label.${key}`),
      value: getFormatValue(item, key).toString(),
    }));
  }, [item]);

  return (
    <Modal header={t('buyTicker', { name: item.name })} {...props}>
      <List list={infoList} className="mb-8" />
      <ErrorBoundary
        FallbackComponent={(props) => (
          <DefaultError {...props} className="my-auto" />
        )}
      >
        <BuyTickerForm
          ticketId={tickerId}
          className="flex flex-col flex-grow-1 h-full"
          onSubmit={() => props.context.onOpenChange(false)}
        />
      </ErrorBoundary>
    </Modal>
  );
};

export default BuyTickerModal;
