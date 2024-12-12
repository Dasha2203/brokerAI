import Table from '@/components/table/Table';
import TBody from '@/components/table/TBody';
import Td from '@/components/table/Td';
import Th from '@/components/table/Th';
import THead from '@/components/table/THead';
import THeadRow from '@/components/table/THeadRow';
import Trow from '@/components/table/TRow';
import { Props } from './types';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getMoneyTransactions, Transaction } from '@/api/user';
import Pagination from '@/components/Pagination';
import { getFormatValue } from './getFormatValue';

const COUNT_VISIBLE = 20;

const keys = [
  'explanationKey',
  'fee',
  'value',
  'createdAt',
] as (keyof Transaction)[];

const TransactionsTable = ({ className }: Props) => {
  const t = useTranslations('profile');
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);

  async function fetchTransactions() {
    try {
      const data = await getMoneyTransactions({
        Offset: (page - 1) * COUNT_VISIBLE,
        Limit: COUNT_VISIBLE,
      });

      setTransactions(data.data);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  if (!transactions.length) return null;

  return (
    <div>
      <div className={className}>
        <div className="hidden md:block">
          <Table caption={t('historyTransactions')} className="text-center">
            <colgroup>
              <col className="w-auto" />
              <col className="w-1/3" />
              <col className="w-1/3" />
              <col className="w-auto" />
            </colgroup>
            <THead>
              <THeadRow>
                {keys.map((key) => (
                  <Th key={key}>{t(`label.${key}`)}</Th>
                ))}
                <Th />
              </THeadRow>
            </THead>
            <TBody>
              {transactions.map((item, idx) => (
                <Trow key={idx}>
                  {keys.map((key) => (
                    <Td key={key}>{getFormatValue(item, key, t)}</Td>
                  ))}
                </Trow>
              ))}
            </TBody>
          </Table>
        </div>
        <div className="md:hidden"></div>
        <Pagination
          className="mt-10 ml-auto"
          total={total}
          count={COUNT_VISIBLE}
          active={page}
          setActive={setPage}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
