'use client';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Table from '@/components/table/Table';
import Td from '@/components/table/Td';
import Th from '@/components/table/Th';
import Trow from '@/components/table/TRow';
import PageContainer from '@/components/ui/PageContainer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SearchIcon from '@/icons/SearchIcon';
import {
  fetchRequests,
  removeRequest,
} from '@/store/reducers/RequestsSlice/actionCreators';
import { RemoveRequestCredentials } from '@/store/reducers/RequestsSlice/types';
import React, { useEffect, useState } from 'react';

const Requests = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const { requests } = useAppSelector((state) => state.requestReducer);

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  function handleRemove({ requestId }: { requestId: string }) {
    dispatch(removeRequest({ requestId }));
  }

  // function handleSubmit(e: KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === 'Enter') {
  //     dispatch(fetchTickers({ TicketName: value }));
  //   }
  // }

  return (
    <PageContainer>
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Requests List</h1>
        {/* <div>
          <Input
            size="lg"
            leftIcon={<SearchIcon className="text-violet-600" />}
            placeholder="Search"
            value={value}
            onChange={handleChange}
            onKeyDown={handleSubmit}
          />
        </div> */}
      </div>
      <Table className="mt-8">
        <Trow
          style={{
            gridTemplateColumns:
              'minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr) auto',
          }}
        >
          <Th>Type</Th>
          <Th>Ticker</Th>
          <Th>Price</Th>
          <Th>Date created</Th>
        </Trow>
        {requests.map(
          ({ requestId, requestType, tickerName, price, createdAt }) => (
            <Trow
              key={requestId}
              className="items-center cursor-pointer"
              // onClick={() => {
              //   console.log('click');
              //   router.push(`/tickers/${stockId}`);
              // }}
              style={{
                gridTemplateColumns:
                  'minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr) minmax(32px, 32fr) auto',
              }}
            >
              <Td className="flex items-center">{requestType}</Td>
              <Td className="flex items-center">{tickerName}</Td>
              <Td className="flex items-center">{price}</Td>
              <Td className="flex items-center">{createdAt}</Td>
              <Td className="flex items-center">
                <Button
                  as="button"
                  variant="outlined"
                  uiColor="primary"
                  onClick={() => handleRemove({ requestId })}
                >
                  Отменить
                </Button>
              </Td>
            </Trow>
          ),
        )}
      </Table>
    </PageContainer>
  );
};

export default Requests;
