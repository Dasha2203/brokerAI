'use client';
import Title from '@/components/Title';
import PageContainer from '@/components/ui/PageContainer';
import useAuth from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import RequestTable from './components/RequestsTable';

const Requests = () => {
  const t = useTranslations('requests');
  const user = useAuth();

  if (!user) return null;

  return (
    <PageContainer className="h-full">
      <div className="flex justify-between">
        <Title text={t('title')} />
      </div>
      <RequestTable />
    </PageContainer>
  );
};

export default Requests;
