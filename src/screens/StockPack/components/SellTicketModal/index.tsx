import { useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslations } from 'next-intl';
import Modal from '@/components/Modal';
import List from '@/components/List';
import { getFormatPrice } from '@/utils/getFormatPrice';
import SellTickerForm from './SellTickerForm';
import { Props } from './types';
import DefaultError from '@/components/errors/DefaultError';
import { sellTicker } from '@/api/ticker';

const SellTicketModal = ({ item, ...props }: Props) => {
  const t = useTranslations();
  const [price, setPrice] = useState('');

  const listProps = useMemo(() => {
    return [
      {
        label: t('stockpacks.label.ticker'),
        value: item.ticker,
      },
      {
        label: t('stockpacks.label.boughtPrice'),
        value: getFormatPrice(item.boughtPrice),
      },
      {
        label: t('stockpacks.label.actualPrice'),
        value: getFormatPrice(item.actualPrice),
      },
    ];
  }, [item]);

  async function handleSell() {
    if (!price) return;

    const data = await sellTicker({
      boughtTicketInStockPackId: item.boughtStockId,
      stockPackId: item.stockId,
      ticketId: item.stockId,
      price: Number(price),
    });

    if (data.data) {
      props.context.onOpenChange(false);
    }
  }

  return (
    <Modal header={t('tickers.sellTicker', { name: item.name })} {...props}>
      <List list={listProps} className="mb-8" />
      <ErrorBoundary
        FallbackComponent={(props) => (
          <DefaultError {...props} className="my-auto" />
        )}
      >
        <SellTickerForm
          price={price}
          setPrice={setPrice}
          item={item}
          handleSubmit={handleSell}
          className="flex flex-col flex-grow-1 h-full"
        />
      </ErrorBoundary>
    </Modal>
  );
};

export default SellTicketModal;
