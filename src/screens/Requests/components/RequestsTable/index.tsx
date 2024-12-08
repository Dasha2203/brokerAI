import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Badge from '@/components/Badge';
import Button from '@/components/buttons/Button';
import Table from '@/components/table/Table';
import TBody from '@/components/table/TBody';
import Td from '@/components/table/Td';
import Th from '@/components/table/Th';
import THead from '@/components/table/THead';
import THeadRow from '@/components/table/THeadRow';
import Trow from '@/components/table/TRow';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getDateFormat } from '@/utils/getDateFormat';
import { getFormatPrice } from '@/utils/getFormatPrice';
import {
  fetchRequests,
  removeRequest,
} from '@/store/reducers/RequestsSlice/actionCreators';
import NoData from '@/components/NoData';
import RequestItem from './RequestItem';
import Pagination from '@/components/Pagination';
import Input from '@/components/forms/Input';
import SearchIcon from '@/icons/SearchIcon';

const COUNT_VISIBLE = 20;

const RequestTable = () => {
  const t = useTranslations('requests');
  const { requests, total } = useAppSelector((state) => state.requestReducer);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');

  function handleFetchRequests() {
    dispatch(
      fetchRequests({
        Offset: (page - 1) * COUNT_VISIBLE,
        Limit: COUNT_VISIBLE,
        TickerName: value,
      }),
    );
  }

  useEffect(() => {
    handleFetchRequests();
  }, [page]);

  function handleRemove({ requestId }: { requestId: string }) {
    dispatch(removeRequest({ requestId }));
  }

  function handleChange(e: string | null) {
    setValue(e || '');
  }

  return (
    <div>
      {requests.length ? (
        <>
          <div className="my-8 flex items-center gap-6 flex-col md:flex-row">
            <Input
              leftIcon={<SearchIcon className="text-violet-600" />}
              placeholder="Search"
              value={value}
              size="lg"
              onChange={handleChange}
              className="w-full md:w-auto"
            />
            <Button
              as="button"
              variant="contained"
              uiColor="primary"
              className="w-full md:w-fit"
              fixedSize
              onClick={handleFetchRequests}
            >
              {t('action.search')}
            </Button>
          </div>

          <div className="hidden md:block">
            <Table className="mt-8 text-center" caption={t('caption')}>
              <colgroup>
                <col className="w-auto" />
                <col className="w-1/3" />
                <col className="w-1/3" />
                <col className="w-1/3" />
                <col className="w-auto" />
              </colgroup>
              <THead>
                <THeadRow>
                  <Th>{t('label.type')}</Th>
                  <Th>{t('label.ticker')}</Th>
                  <Th>{t('label.price')}</Th>
                  <Th>{t('label.dateCreated')}</Th>
                  <Th />
                </THeadRow>
              </THead>
              <TBody>
                {requests?.map((item) => (
                  <Trow>
                    <Td className="">
                      <Badge
                        color={item.requestType === 'Sell' ? 'red' : 'green'}
                        text={t(item.requestType)}
                      />
                    </Td>
                    <Td>{item.tickerName}</Td>
                    <Td>{getFormatPrice(item.price)}</Td>
                    <Td>{getDateFormat(item.createdAt)}</Td>
                    <Td>
                      <Button
                        as="button"
                        variant="contained"
                        uiColor="danger"
                        onClick={() =>
                          handleRemove({ requestId: item.requestId })
                        }
                      >
                        {t('action.cancel')}
                      </Button>
                    </Td>
                  </Trow>
                ))}
              </TBody>
            </Table>
          </div>
          <div className="md:hidden">
            {requests.map((item) => (
              <RequestItem
                key={item.requestId}
                item={item}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <Pagination
            className="mt-10 ml-auto"
            total={total}
            count={COUNT_VISIBLE}
            active={page}
            setActive={setPage}
          />
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default RequestTable;
