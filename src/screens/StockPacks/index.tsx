'use client';
import Button from '@/components/buttons/Button';
import useModal from '@/hooks/useModal';
import React from 'react';
import CreateStockPackModal from './components/CreateStockPackModal';
import PageContainer from '@/components/ui/PageContainer';

const StockPacks = () => {
  const modal = useModal();
  function handleClick() {
    modal.setIsOpen(true);
  }

  return (
    <PageContainer>
      <Button as="button" onClick={handleClick}>
        Create stockpack
      </Button>
      {modal.isOpen && <CreateStockPackModal {...modal.modalProps} />}
    </PageContainer>
  );
};

export default StockPacks;
