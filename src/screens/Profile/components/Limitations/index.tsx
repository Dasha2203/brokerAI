import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { getLimitations, Limits } from '@/api/user';
import Box from '@/components/ui/Box';
import { Props } from './types';
import { getFormatPrice } from '@/utils/getFormatPrice';
import { getDateFormat } from '@/utils/getDateFormat';
import Badge from '@/components/Badge';
import LoadingIcon from '@/icons/LoadingIcon';

const commonLi = clsx('py-1 my-1 flex justify-between items-center');
const commonLabel = clsx('uppercase font-bold text-gray-300');

const Limitations = ({ className }: Props) => {
  const t = useTranslations('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState<Limits | null>(null);

  async function fetchLimits() {
    try {
      setIsLoading(true);
      const data = await getLimitations();
      setLimit(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchLimits();
  }, []);

  return (
    <Box className={clsx(className)}>
      <div className="font-bold text-2xl">{t('limits')}</div>
      {isLoading && (
        <LoadingIcon className="text-violet-600 w-8 h-8 animate-spin mx-auto" />
      )}
      {limit ? (
        <ul className="mt-8 font-semibold">
          <li className={clsx(commonLi)}>
            <span className={clsx(commonLabel)}>{t('label.funds')}</span>
            {getFormatPrice(limit.funds)}
          </li>
          <li className={clsx(commonLi)}>
            <span className={clsx(commonLabel)}>
              {t('label.currentCountStockPacks')}
            </span>
            {limit.currentCountStockPacks}
          </li>
          <li className={clsx(commonLi)}>
            <span className={clsx(commonLabel)}>
              {t('label.maxCountStockPacks')}
            </span>
            {limit.maxCountStockPacks}
          </li>
          <li className={clsx(commonLi)}>
            <span className={clsx(commonLabel)}>
              {t('label.subscriptionName')}
            </span>
            {limit.subscriptionName || '-'}
          </li>
          <li className={clsx(commonLi)}>
            <span className={clsx(commonLabel)}>
              {t('label.currentPeriodEnd')}
            </span>
            {getDateFormat(limit.currentPeriodEnd)}
          </li>
          <li className={clsx(commonLi)}>
            <span className={clsx(commonLabel)}>
              {t('label.activeSubscription')}
            </span>
            {
              <Badge
                size="xs"
                color={limit.activeSubscription ? 'green' : 'red'}
                text={limit.activeSubscription ? t('active') : t('notActive')}
                className="uppercase"
              />
            }
          </li>
        </ul>
      ) : null}
    </Box>
  );
};

export default Limitations;
