import { KeyboardEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ButtonIcon from '@/components/buttons/ButtonIcon';
import Pagination from '@/components/Pagination';
import Table from '@/components/table/Table';
import TBody from '@/components/table/TBody';
import Td from '@/components/table/Td';
import Th from '@/components/table/Th';
import THead from '@/components/table/THead';
import THeadRow from '@/components/table/THeadRow';
import Trow from '@/components/table/TRow';
import FavoritesIcon from '@/icons/FavoritesIcon';
import { getFormatPrice } from '@/utils/getFormatPrice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  fetchTickers,
  removeBookmarkTicker,
  AddBookmarkTicker,
} from '@/store/reducers/TickerSlice/actionCreators';
import TickerItem from './TickerItem';
import { Ticker } from '@/store/reducers/TickerSlice/types';
import Input from '@/components/forms/Input';
import SearchIcon from '@/icons/SearchIcon';
import Button from '@/components/buttons/Button';
import clsx from 'clsx';

const keys = [
  'name',
  'ticker',
  'industryKey',
  'sectorKey',
  'actualPrice',
] as (keyof Ticker)[];

const COUNT_VISIBLE = 5;

const TickersTable = () => {
  const t = useTranslations('tickers');
  const [isShowBookmarked, setIsShowBookmarked] = useState(false);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { tickers, total } = useAppSelector((state) => state.tickerReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchTickers({
        Offset: (page - 1) * COUNT_VISIBLE,
        Limit: COUNT_VISIBLE,
        OnlyFavorite: isShowBookmarked,
      }),
    );
  }, [page, isShowBookmarked]);

  function handleSubmit(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      dispatch(
        fetchTickers({
          TicketName: value,
          Offset: (page - 1) * COUNT_VISIBLE,
          Limit: COUNT_VISIBLE,
          OnlyFavorite: isShowBookmarked,
        }),
      );
    }
  }

  function handleChange(e: string | null) {
    setValue(e || '');
  }

  function handleBookmark({
    bookmarked,
    stockId,
  }: {
    bookmarked: boolean;
    stockId: string;
  }) {
    if (bookmarked) {
      dispatch(removeBookmarkTicker({ stockId }));
      return;
    }
    dispatch(AddBookmarkTicker({ stockId }));
  }

  function handleToggleBookmarked() {
    setIsShowBookmarked((prev) => !prev);
    setPage(1);
  }

  return (
    <div>
      <div className="my-8 flex flex-col gap-4 md:flex-row">
        <Input
          size="lg"
          leftIcon={<SearchIcon className="text-violet-600" />}
          placeholder="Search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleSubmit}
          className="w-full md:w-auto"
        />
        <Button
          as="button"
          className="w-full md:w-auto flex justify-center items-center gap-4"
          fixedSize
          onClick={handleToggleBookmarked}
        >
          {!isShowBookmarked && (
            <FavoritesIcon
              className={clsx('w-7 h-7 ', {
                'fill-transparent text-transparent': !!isShowBookmarked,
              })}
            />
          )}
          {isShowBookmarked ? t('action.showAll') : t('action.bookmark.show')}
        </Button>
      </div>
      <div className="hidden md:block">
        <Table caption={t('shortInfo')} className="mt-8 text-center">
          <THead>
            <THeadRow>
              <Th />
              {keys.map((key, idx) => (
                <Th key={idx}>{t(key)}</Th>
              ))}
            </THeadRow>
          </THead>
          <TBody>
            {tickers.map((ticker) => (
              <Trow
                key={ticker.stockId}
                className="items-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/tickers/${ticker.stockId}`);
                }}
              >
                <Td className="flex items-center">
                  <ButtonIcon
                    active={ticker.bookmarked}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark({
                        stockId: ticker.stockId,
                        bookmarked: ticker.bookmarked,
                      });
                    }}
                    icon={FavoritesIcon}
                    color={'yellow'}
                    aria-label={
                      ticker.bookmarked
                        ? t('action.bookmark.remove')
                        : t('action.bookmark.add')
                    }
                  />
                </Td>
                {keys.map((key) => (
                  <Td key={key} className="first:font-bold">
                    {key === 'actualPrice'
                      ? getFormatPrice(ticker[key])
                      : ticker[key] || '-'}
                  </Td>
                ))}
              </Trow>
            ))}
          </TBody>
        </Table>
      </div>

      <div className="md:hidden">
        {tickers.map((ticker) => (
          <TickerItem
            key={ticker.stockId}
            ticker={ticker}
            handleBookmark={handleBookmark}
          />
        ))}
      </div>
      <Pagination
        className="mt-10 ml-auto"
        total={total}
        count={COUNT_VISIBLE}
        active={page}
        setActive={setPage}
      />
    </div>
  );
};

export default TickersTable;
