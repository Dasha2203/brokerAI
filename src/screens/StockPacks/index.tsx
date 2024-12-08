'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import Pagination from '@/components/Pagination';
import StockPackCard from '@/components/StockPackCard';
import PageContainer from '@/components/ui/PageContainer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useModal from '@/hooks/useModal';
import { fetchStockPacks } from '@/store/reducers/UserSlice/actionCreators';
import CreateStockPackModal from './components/CreateStockPackModal';
import useUser from '@/hooks/useAuth';
import useAuth from '@/hooks/useAuth';

const COUNT_VISIBLE = 20;

const StockPacks = () => {
  const t = useTranslations('stockpacks');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { stockpacks } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const modal = useModal();
  const user = useAuth();

  function handleClick() {
    modal.setIsOpen(true);
  }

  useEffect(() => {
    if (!user) return;
    dispatch(
      fetchStockPacks({
        limit: COUNT_VISIBLE,
        Offset: (page - 1) * COUNT_VISIBLE,
      }),
    );
  }, [page, user]);

  return (
    <PageContainer>
      <h1 className="font-bold text-4xl">{t('stockpacksTitle')}</h1>

      <div
        className={clsx(
          'my-6 p-7 rounded-[14px]',
          'bg-white',
          'dark:bg-violet-500',
        )}
      >
        <div className="text-2xl font-semibold">
          {t('totalStockPacks')}: <span className="">{stockpacks.total}</span>
        </div>
        <div className="mt-9 flex flex-col gap-3 md:flex-row md:gap-6">
          <Button
            as="button"
            uiColor="primary"
            variant="contained"
            onClick={handleClick}
          >
            {t('button.createNewStockPack')}
          </Button>
          <Button
            as="link"
            href={'/stockpacks-analysis'}
            uiColor="primary"
            variant="outlined"
          >
            {t('button.showAnalysis')}
          </Button>
        </div>
      </div>
      {/* <div className="my-9 p-7 flex justify-between items-center bg-white rounded-xl">
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
      </div> */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 ">
        {stockpacks.list.map((data) => (
          <StockPackCard
            key={data.stockPackId}
            data={data}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('here', e.target);
              router.push(`/stockpacks/${data.stockPackId}`);
            }}
          />
        ))}
      </div>

      <Pagination
        className="mt-10 ml-auto"
        total={stockpacks.total}
        count={COUNT_VISIBLE}
        active={page}
        setActive={setPage}
      />

      {modal.isOpen && <CreateStockPackModal {...modal.modalProps} />}
    </PageContainer>
  );
};

export default StockPacks;
