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

  return (
    <div className={className}>
      <div className="hidden md:block">
        <Table caption={t('detailsStock')} className="text-center">
          <THead>
            <THeadRow>
              {keys.map((key) => (
                <Th key={key}>{t(`label.${key}`)}</Th>
              ))}
            </THeadRow>
          </THead>
          <TBody>
            {items?.map((item) => (
              <Trow>
                {keys.map((key) => (
                  <Td>{getFormatValue(item, key)}</Td>
                ))}
              </Trow>
            ))}
          </TBody>
        </Table>
      </div>
      <div className="md:hidden">
        {items?.map((item) => <StockDetailsItem item={item} keys={keys} />)}
      </div>
    </div>
  );
};

export default StockDetailsTable;
