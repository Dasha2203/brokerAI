'use client';
import Button from '@/components/buttons/Button';
import useModal from '@/hooks/useModal';
import React, { useEffect } from 'react';
import CreateStockPackModal from './components/CreateStockPackModal';
import PageContainer from '@/components/ui/PageContainer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchStockPacks } from '@/store/reducers/UserSlice/actionCreators';
import StockPackCard from '@/components/StockPackCard';
import Link from 'next/link';

const StockPacks = () => {
  const { stockpacks } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const modal = useModal();
  function handleClick() {
    modal.setIsOpen(true);
  }

  useEffect(() => {
    dispatch(fetchStockPacks({}));
  }, []);

  return (
    <PageContainer>
      <h1 className="font-bold text-4xl">Invest portfolio</h1>
      <div className="my-9 p-7 flex justify-between items-center bg-white rounded-xl">
        <div className="flex gap-4 items-center font-semibold text-gray-300 text-2xl">
          Total cost:{' '}
          <span className="text-black text-3xl">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 3,
            }).format(100000)}
          </span>
        </div>
        <Button
          as="button"
          uiColor="primary"
          variant="contained"
          onClick={handleClick}
        >
          Create
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-7">
        {stockpacks.list.map((data) => (
          <Link key={data.stockPackId} href={`/stockpacks/${data.stockPackId}`}>
            <StockPackCard key={data.stockPackId} data={data} />
          </Link>
        ))}
      </div>

      {modal.isOpen && <CreateStockPackModal {...modal.modalProps} />}
    </PageContainer>
  );
};

export default StockPacks;
