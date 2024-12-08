import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Ticker } from '@/store/reducers/TickerSlice/types';
import Item from '@/components/table/Item';
import Button from '@/components/buttons/Button';
import FavoritesIcon from '@/icons/FavoritesIcon';
import ButtonIcon from '@/components/buttons/ButtonIcon';
import { TickerItemProps } from './types';
import { getFormatPrice } from '@/utils/getFormatPrice';

const keys = [
  'actualPrice',
  'industryKey',
  'name',
  'ticker',
  'sectorKey',
] as (keyof Ticker)[];

const TickerItem = ({ ticker, handleBookmark }: TickerItemProps) => {
  const t = useTranslations('tickers');
  const { stockId, name, bookmarked } = ticker;

  return (
    <Item>
      <div className="flex justify-between items-center text-2xl font-bold">
        <div className="truncate">{name}</div>
        <ButtonIcon
          active={bookmarked}
          icon={FavoritesIcon}
          color={'yellow'}
          aria-label={
            bookmarked ? t('action.bookmark.remove') : t('action.bookmark.add')
          }
          className="flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            handleBookmark({
              stockId: stockId,
              bookmarked: bookmarked,
            });
          }}
        />
      </div>
      <ul className="mt-6">
        {keys.map((key) => (
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
            <span className="font-bold">{t(key)}</span>
            <span>
              {key === 'actualPrice'
                ? getFormatPrice(ticker[key])
                : ticker[key] || '-'}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-9 flex flex-col gap-3">
        <Button
          as="link"
          href={`/tickers/${ticker.stockId}`}
          uiColor="primary"
          variant="contained"
          fixedSize
        >
          {t('action.goTo', { name })}
        </Button>
      </div>
    </Item>
  );
};

export default TickerItem;
