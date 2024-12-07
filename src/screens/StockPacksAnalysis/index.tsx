'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Title from '@/components/Title';
import PageContainer from '@/components/ui/PageContainer';
import { useAppDispatch } from '@/hooks/redux';
import { getAnalysisStockPack } from '@/store/reducers/UserSlice/actionCreators';
import StockDetailsTable from './components/StockDetailsTable';
import Info from './components/Info';

const StockPackAnalysis = () => {
  const t = useTranslations('stockpacks');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAnalysisStockPack());
  }, []);

  return (
    <PageContainer>
      <Title text={t('analysisTitle')} />
      <Info />
      <StockDetailsTable />
    </PageContainer>
  );
};

export default StockPackAnalysis;
