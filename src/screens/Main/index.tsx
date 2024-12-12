'use client';

import PageContainer from '@/components/ui/PageContainer';
import useAuth from '@/hooks/useAuth';

const Main = () => {
  const user = useAuth();

  return (
    <PageContainer>

      <div className="h-[2000px] bg-yellow-50">
        <div className="p-8 bg-green-200 max-w-[300px]"></div>
      </div>
    </PageContainer>
  );
};

export default Main;
