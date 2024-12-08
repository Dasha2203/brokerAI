import Table from '@/components/table/Table';
import TBody from '@/components/table/TBody';
import Td from '@/components/table/Td';
import Th from '@/components/table/Th';
import THead from '@/components/table/THead';
import THeadRow from '@/components/table/THeadRow';
import Trow from '@/components/table/TRow';
import { useTranslations } from 'next-intl';
import { getFormatValue } from './getFormatValue';
import StockDetailsItem from './StockDetailsItem';
import { Props } from './types';
import { SpecificStockPack } from '@/api/stockpack';
import Button from '@/components/buttons/Button';
import { useState } from 'react';
import SellTicketModal from '../SellTicketModal';
import useModal from '@/hooks/useModal';

const keys = [
  'name',
  'ticker',
  'boughtAt',
  'boughtPrice',
  'actualPrice',
  'industryKey',
  'sectorKey',
] as (keyof SpecificStockPack)[];

const StockDetailsTable = ({ items, className }: Props) => {
  const t = useTranslations('stockpacks');
  const [sellTicker, setSellTicker] = useState<SpecificStockPack | null>(null);
  const modal = useModal();

  function handleSell(value: SpecificStockPack) {
    modal.setIsOpen(true);
    setSellTicker(value);
  }

  return (
    <div className={className}>
      <div className="hidden md:block">
        <Table caption={t('detailsStock')} className="text-center">
          <THead>
            <THeadRow>
              {keys.map((key) => (
                <Th key={key}>{t(`label.${key}`)}</Th>
              ))}
              <Th />
            </THeadRow>
          </THead>
          <TBody>
            {items?.map((item) => (
              <Trow>
                {keys.map((key) => (
                  <Td>{getFormatValue(item, key)}</Td>
                ))}
                <Td>
                  <Button
                    as="button"
                    variant="contained"
                    uiColor="danger"
                    className="w-full"
                    onClick={() => handleSell(item)}
                  >
                    {t('button.sell')}
                  </Button>
                </Td>
              </Trow>
            ))}
          </TBody>
        </Table>
      </div>
      <div className="md:hidden">
        {items?.map((item) => (
          <StockDetailsItem item={item} keys={keys} handleSell={handleSell} />
        ))}
      </div>
      {modal.isOpen && sellTicker && (
        <SellTicketModal {...modal.modalProps} item={sellTicker} />
      )}
    </div>
  );
};

export default StockDetailsTable;
