'use client';
import React, { KeyboardEvent } from 'react';
import Input from '@/components/forms/Input';
import Table from '@/components/table/Table';
import Td from '@/components/table/Td';
import Th from '@/components/table/Th';
import Trow from '@/components/table/TRow';
import PageContainer from '@/components/ui/PageContainer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SearchIcon from '@/icons/SearchIcon';
import {
  AddBookmarkTicker,
  fetchTickers,
  removeBookmarkTicker,
} from '@/store/reducers/TickerSlice/actionCreators';
import { useEffect, useState } from 'react';
import FavoritesIcon from '@/icons/FavoritesIcon';
import ButtonIcon from '@/components/buttons/ButtonIcon';
import { useRouter } from 'next/navigation';

const Tickers = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const router = useRouter();
  const { tickers } = useAppSelector((state) => state.tickerReducer);

  useEffect(() => {
    dispatch(fetchTickers({}));
  }, []);

  function handleChange(e: string | null) {
    setValue(e || '');
  }

  function handleSubmit(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      dispatch(fetchTickers({ TicketName: value }));
    }
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

  return (
    <PageContainer>
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Tickers List</h1>
        <div>
          <Input
            size="lg"
            leftIcon={<SearchIcon className="text-violet-600" />}
            placeholder="Search"
            value={value}
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
        </div>
      </div>
      <Table className="mt-8">
        <Trow
          style={{
            gridTemplateColumns:
              'minmax(92px, 92px) minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr)',
          }}
        >
          <Th> </Th>
          <Th>Ticker</Th>
          <Th>Name</Th>
          <Th>Sector</Th>
          <Th>Indastry</Th>
          <Th>Price</Th>
        </Trow>
        {tickers.map(
          ({
            industryKey,
            sectorKey,
            stockId,
            ticker,
            name,
            actualPrice,
            bookmarked,
          }) => (
            <Trow
              key={stockId}
              className="items-center cursor-pointer"
              onClick={() => {
                console.log('click');
                router.push(`/tickers/${stockId}`);
              }}
              style={{
                gridTemplateColumns:
                  'minmax(92px, 92px) minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr)',
              }}
            >
              <Td className="flex items-center">
                <ButtonIcon
                  active={bookmarked}
                  onClick={() => handleBookmark({ stockId, bookmarked })}
                  icon={FavoritesIcon}
                  color={'yellow'}
                  aria-label={
                    bookmarked ? 'Remove from bookmark' : 'Add to bookmark'
                  }
                />
              </Td>
              <Td className="flex items-center">{ticker}</Td>
              <Td className="flex items-center">{name}</Td>
              <Td className="flex items-center">{sectorKey}</Td>
              <Td className="flex items-center">{industryKey}</Td>
              <Td className="flex items-center">{actualPrice}</Td>
            </Trow>
          ),
        )}
      </Table>
    </PageContainer>
  );
};

export default Tickers;
