'use client';

import PageContainer from '@/components/ui/PageContainer';
import useAuth from '@/hooks/useAuth';

const Main = () => {
  const user = useAuth();

  return (
    <PageContainer>
      <div className="container max-w-64 bg-slate-400 w-full">
        <div className="table w-full">
          <div className="sticky w-full overflow-x-auto top-0 thead grid grid-cols-[50px_minmax(140px,140fr)_minmax(140px,140fr)_minmax(300px,300fr)] bg-red-300 overflow-x-auto">
            <div className="sticky left-0">id</div>
            <div>name</div>
            <div>price</div>
            <div>description</div>
          </div>
          <div className="tbody">
            <div className="tr  top-0 thead grid grid-cols-[50px_minmax(140px,140fr)_minmax(140px,140fr)_minmax(300px,300fr)] border-b border-gray-300">
              <div>1</div>
              <div>Iphone 4</div>
              <div>100</div>
              <div>some text</div>
            </div>

            <div className="tr  top-0 thead grid grid-cols-[50px_minmax(140px,140fr)_minmax(140px,140fr)_minmax(300px,300fr)] border-b border-gray-300">
              <div>1</div>
              <div>Iphone 4</div>
              <div>100</div>
              <div>some text</div>
            </div>

            <div className="tr  top-0 thead grid grid-cols-[50px_minmax(140px,140fr)_minmax(140px,140fr)_minmax(300px,300fr)] border-b border-gray-300">
              <div>1</div>
              <div>Iphone 4</div>
              <div>100</div>
              <div>some text</div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[2000px] bg-yellow-50">
        <div className="p-8 bg-green-200 max-w-[300px]"></div>
      </div>
    </PageContainer>
  );
};

export default Main;
