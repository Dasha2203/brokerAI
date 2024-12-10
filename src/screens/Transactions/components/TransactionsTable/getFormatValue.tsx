import { Transaction } from '@/api/user';
import Badge from '@/components/Badge';
import { OutcomeFundsOperationsEnum } from '@/types/payments';
import { getDateFormat } from '@/utils/getDateFormat';
import { getFormatPrice } from '@/utils/getFormatPrice';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export function getFormatValue(
  item: Transaction,
  key: keyof Transaction,
  t: ReturnType<typeof useTranslations>,
) {
  if (key === 'fee' || key === 'value') {
    return (
      <span
        className={clsx('font-semibold', {
          'text-red': item[key] < 0,
          'text-green': item[key] > 0,
        })}
      >
        {getFormatPrice(item[key])}
      </span>
    );
  }
  if (key === 'createdAt') {
    return getDateFormat(item[key]);
  }

  if (key === 'explanationKey') {
    return (
      <Badge
        size="xs"
        color={
          Object.values(OutcomeFundsOperationsEnum).includes(
            item[key] as OutcomeFundsOperationsEnum,
          )
            ? 'red'
            : 'green'
        }
        className="mx-auto"
        text={t(`transactions.${item[key]}`)}
      />
    );
  }

  return item[key];
}
