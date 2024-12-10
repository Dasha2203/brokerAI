'use client';
import Title from '@/components/Title';
import PageContainer from '@/components/ui/PageContainer';
import { useTranslations } from 'next-intl';
import TransactionsTable from './components/TransactionsTable';

const Transactions = () => {
  const t = useTranslations('profile');
  return (
    <PageContainer>
      <Title text={t('label.transactions')} />
      <TransactionsTable className="mt-8" />
    </PageContainer>
  );
};

export default Transactions;
