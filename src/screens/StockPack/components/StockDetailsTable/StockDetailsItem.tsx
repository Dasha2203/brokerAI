import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import Item from '@/components/table/Item';
import { getFormatValue } from './getFormatValue';
import { ItemProps } from './types';

const StockDetailsItem = ({ item, keys }: ItemProps) => {
  const t = useTranslations('stockpacks');

  return (
    <Item>
      <div className="truncate text-2xl font-bold">{item['name']}</div>
      <ul className="mt-6">
        {keys
          .filter((item) => item !== 'name')
          .map((key) => (
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
              <span>{getFormatValue(item, key)}</span>
            </li>
          ))}
      </ul>
    </Item>
  );
};

export default StockDetailsItem;