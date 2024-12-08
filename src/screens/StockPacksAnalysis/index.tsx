'use client';
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Title from '@/components/Title';
import PageContainer from '@/components/ui/PageContainer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getAnalysisStockPack } from '@/store/reducers/UserSlice/actionCreators';
import StockDetailsTable from './components/StockDetailsTable';
import Info from './components/Info';
import DifferenceCharts from './components/DifferenceCharts';
import clsx from 'clsx';
import useAuth from '@/hooks/useAuth';

const StockPackAnalysis = () => {
  const t = useTranslations('stockpacks');
  const dispatch = useAppDispatch();
  const { analysis } = useAppSelector((state) => state.userReducer.stockpacks);
  const user = useAuth();

  useEffect(() => {
    if (!user) return;
    dispatch(getAnalysisStockPack());
  }, [user]);

  const sumByStock = useMemo(
    () =>
      analysis?.data.sumByStock
        ? [...analysis.data.sumByStock]
            .sort((a, b) => b.currentPrice - a.currentPrice)
            .slice(0, 5)
            .map((i) => ({
              key: i.key,
              currentPrice: i.currentPrice,
            }))
        : [],
    [analysis],
  );
  const sumByIndastry = useMemo(
    () =>
      analysis?.data.sumByIndustry
        ? [...analysis.data.sumByIndustry]
            .sort((a, b) => b.currentPrice - a.currentPrice)
            .slice(0, 5)
            .map((i) => ({
              key: i.key,
              currentPrice: i.currentPrice,
            }))
        : [],
    [analysis],
  );

  return (
    <PageContainer>
      <Title text={t('analysisTitle')} />
      <Info className="mt-8" />

      <div className="my-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div
          className={clsx(
            'p-7 rounded-[14px]',
            'bg-white',
            'dark:bg-violet-500',
          )}
        >
          <div className="font-bold text-center">{t('assetWeight')}</div>
          <DifferenceCharts data={sumByStock} />
        </div>
        <div
          className={clsx(
            'p-7 rounded-[14px]',
            'bg-white',
            'dark:bg-violet-500',
          )}
        >
          <div className="font-bold text-center">{t('industryWeight')}</div>

          <DifferenceCharts data={sumByIndastry} />
        </div>
      </div>
      <StockDetailsTable />
    </PageContainer>
  );
};

export default StockPackAnalysis;
