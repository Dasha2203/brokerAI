import Badge from '@/components/Badge';
import Button from '@/components/buttons/Button';
import List from '@/components/List';
import Item from '@/components/table/Item';
import { useTranslations } from 'next-intl';
import { RequestItemProps } from './types';
import { useMemo } from 'react';
import { getFormatPrice } from '@/utils/getFormatPrice';
import { getDateFormat } from '@/utils/getDateFormat';

const RequestItem = ({ item, onRemove }: RequestItemProps) => {
  const t = useTranslations('requests');

  const list = useMemo(
    () => [
      {
        label: t('label.type'),
        value: item.requestType,
      },
      {
        label: t('label.ticker'),
        value: item.tickerName,
      },
      {
        label: t('label.price'),
        value: getFormatPrice(item.price),
      },
      {
        label: t('label.dateCreated'),
        value: getDateFormat(item.createdAt),
      },
    ],
    [item],
  );

  return (
    <Item>
      <div className="flex justify-between items-center text-2xl font-bold">
        <div className="truncate">{item.tickerName}</div>
        <Badge
          color={item.requestType === 'Sell' ? 'red' : 'green'}
          text={t(item.requestType)}
        />
      </div>
      <List list={list} className="mt-6" />
      <div className="mt-9 flex flex-col gap-3">
        <Button
          as="button"
          variant="contained"
          uiColor="danger"
          onClick={() => onRemove({ requestId: item.requestId })}
        >
          {t('action.cancel')}
        </Button>
      </div>
    </Item>
  );
};

export default RequestItem;
