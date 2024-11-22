'use client';
import { getStockpack, SpecificStockPack } from '@/api/stockpack';
import PageContainer from '@/components/ui/PageContainer';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const StockPack = () => {
  const [stockpack, setStockpack] = useState<SpecificStockPack[]>([]);
  const params = useParams();
  const stockPackId = params.id as string;

  async function fetchSpecificStockpack() {
    try {
      const data = await getStockpack({ stockPackId });
      setStockpack([...data.data]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSpecificStockpack();
  }, [stockPackId]);

  return (
    <PageContainer>
      {stockpack.map((i) => i.boughtPrice).join(', ')}
    </PageContainer>
  );
};

export default StockPack;
