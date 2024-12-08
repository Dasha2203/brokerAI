'use client';
import {
  getInfoStockpack,
  getStockpack,
  SpecificStockPack,
} from '@/api/stockpack';
import Title from '@/components/Title';
import PageContainer from '@/components/ui/PageContainer';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import StockDetailsTable from './components/StockDetailsTable';
import Pagination from '@/components/Pagination';
import { IStockPack } from '@/models/IStockPack';
import useAuth from '@/hooks/useAuth';

const COUNT_VISIBLE = 20;

const StockPack = () => {
  const [tickers, setTickers] = useState<SpecificStockPack[]>([]);
  const [stockPack, setStockPack] = useState<IStockPack | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const params = useParams();
  const stockPackId = params.id as string;
  const user = useAuth();

  async function fetchSpecificStockpack() {
    try {
      const { data: infoStockPack } = await getInfoStockpack({ stockPackId });
      setStockPack(infoStockPack[0] || null);
      const data = await getStockpack({
        stockPackId,
        Offset: (page - 1) * COUNT_VISIBLE,
        Limit: COUNT_VISIBLE,
      });
      setTotal(data.total);
      setTickers([...data.data]);
    } catch (err) {
      console.log(err);
    }
  }

  function removeTicker(tickerId: string) {
    // const idx = tickers.findIndex(i => i.)
  }

  useEffect(() => {
    if (!stockPackId || !user) return;
    fetchSpecificStockpack();
  }, [stockPackId, page, user]);

  if (!user) return null;

  return (
    <PageContainer>
      <Title text={stockPack?.stockPackName ?? ''} />
      <StockDetailsTable items={tickers} className="mt-8" />
      <Pagination
        className="mt-10 ml-auto"
        total={total}
        count={COUNT_VISIBLE}
        active={page}
        setActive={setPage}
      />
    </PageContainer>
  );
};

export default StockPack;
