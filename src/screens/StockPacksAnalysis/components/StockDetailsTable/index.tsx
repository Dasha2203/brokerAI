import Table from '@/components/table/Table';
import TBody from '@/components/table/TBody';
import Td from '@/components/table/Td';
import Th from '@/components/table/Th';
import THead from '@/components/table/THead';
import THeadRow from '@/components/table/THeadRow';
import Trow from '@/components/table/TRow';
import { useAppSelector } from '@/hooks/redux';
import { StockPackDetails } from '@/store/reducers/UserSlice/types';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { getFormatValue } from './getFormatValue';
import StockDetailsItem from './StockDetailsItem';

const keys = [
  'name',
  'ticker',
  'sectorKey',
  'industryKey',
  'revenue',
  'boughtPrice',
  'currentPrice',
] as (keyof StockPackDetails)[];

const StockDetailsTable = () => {
  const t = useTranslations('stockpacks');
  const { analysis } = useAppSelector((state) => state.userReducer.stockpacks);
  const stockDetails = useMemo(() => analysis?.data.stockDetails, [analysis]);

  return (
    <div>
      <div className="hidden md:block">
        <Table caption={'Details stockpack'} className="text-center">
          <THead>
            <THeadRow>
              {keys.map((key) => (
                <Th key={key}>{t(`label.${key}`)}</Th>
              ))}
            </THeadRow>
          </THead>
          <TBody>
            {stockDetails?.map((item) => (
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
        {stockDetails?.map((item) => (
          <StockDetailsItem item={item} keys={keys} />
        ))}
      </div>
    </div>
  );
};

export default StockDetailsTable;
