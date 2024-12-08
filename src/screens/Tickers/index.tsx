'use client';
import PageContainer from '@/components/ui/PageContainer';
import { useTranslations } from 'next-intl';

import TickersTable from './components/TickersTable';
import useAuth from '@/hooks/useAuth';

const Tickers = () => {
  const t = useTranslations('tickers');
  const user = useAuth();

  if (!user) return null;

  return (
    <PageContainer>
      <h1 className="font-bold text-4xl">{t('tickersTitle')}</h1>

      <TickersTable />
    </PageContainer>
  );
};

export default Tickers;
