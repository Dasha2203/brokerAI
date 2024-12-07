import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useAppSelector } from '@/hooks/redux';
import { InfoStockPackKeys } from './types';
import { getFormatValue } from './getFormatValue';

const firstKeys: (keyof InfoStockPackKeys)[] = [
  'totalPrice',
  'boughtPrice',
  'revenue',
];

const secondKeys: (keyof InfoStockPackKeys)[] = [
  'revenuePercentage',
  'riskFreeRate',
  'sharpeRatio',
];

const Info = () => {
  const t = useTranslations('stockpacks');
  const {
    stockpacks: { analysis },
  } = useAppSelector((state) => state.userReducer);

  if (!analysis) return null;

  return (
    <div
      className={clsx(
        'my-6 p-7 rounded-[14px]',
        'grid md:gap-20 md:grid-cols-2',
        'bg-white',
        'dark:bg-violet-500',
      )}
    >
      <div>
        <ul>
          {firstKeys.map((key) => (
            <li
              key={key}
              className={clsx(
                'my-1 py-2 flex justify-between text-lg border-b-2',
                // light
                'border-[#F4F4F4]',
                // dark
                'dark:border-violet-400',
              )}
            >
              <span className="font-bold">{t(`label.${key}`)}</span>
              <span className="text-gray-300">
                {getFormatValue(analysis.data, key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="">
          {secondKeys.map((key) => (
            <li
              key={key}
              className={clsx(
                'my-1 py-2 flex justify-between text-lg border-b-2',
                // light
                'border-[#F4F4F4]',
                // dark
                'dark:border-violet-400',
              )}
            >
              <span className="font-bold">{t(`label.${key}`)}</span>
              <span className="text-gray-300">
                {getFormatValue(analysis.data, key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Info;
