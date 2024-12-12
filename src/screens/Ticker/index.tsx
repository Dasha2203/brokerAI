'use client';
import { tickerHistory, TickerHistoryItem } from '@/api/ticker';
import Button from '@/components/buttons/Button';
import CustomDateRangePicker from '@/components/DatePicker';
import List from '@/components/List';
import Title from '@/components/Title';
import PageContainer from '@/components/ui/PageContainer';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import { ITicker } from '@/models/ITicker';
import { getFormatPrice } from '@/utils/getFormatPrice';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import BuyTickerModal from './components/BuyTickerModal';
import { getFormatValue } from './getFormatValue';

const Ticker = () => {
  const t = useTranslations('tickers');
  const params = useParams();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [history, setHistory] = useState<TickerHistoryItem[]>([]);
  const [ticker, setTicker] = useState<ITicker | null>(null);
  const user = useAuth();
  const modal = useModal();
  const ticketId = params.id as string;

  useEffect(() => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    setStartDate(threeMonthsAgo);
    setEndDate(currentDate);
    // fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const ticketId = params.id as string;
      const data = await tickerHistory({
        ticketId,
        StartAt: startDate?.toISOString(),
        EndAt: endDate?.toISOString(),
      });
      setHistory(
        data.data.history.map((i) => ({
          ...i,
          timestamp: new Date(i.timestamp).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        })),
      );
      setTicker(data.data.ticket);
    } catch (err) {
      console.log(err);
    }
  }

  const infoList = useMemo(() => {
    if (!ticker) return [];
    const keys: (keyof ITicker)[] = [
      'actualPrice',
      'industryKey',
      'sectorKey',
      'ticker',
    ];
    return keys.map((key) => ({
      label: t(`label.${key}`),
      value: getFormatValue(ticker, key).toString(),
    }));
  }, [ticker]);

  useEffect(() => {
    if (endDate && startDate) {
      fetchHistory();
    }
  }, [endDate]);

  function resetDate() {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    setStartDate(threeMonthsAgo);
    setEndDate(currentDate);
  }

  if (!ticketId || !user) return null;

  return (
    <PageContainer>
      <Title text={ticker?.name || ''} />
      <div className="flex flex-col lg:flex-row gap-11 mt-8 ">
        <div className="box lg:w-2/3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-full md:w-[275px]">
              <CustomDateRangePicker
                startDate={startDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
              />
            </div>
            <Button
              as="button"
              uiColor="primary"
              variant="contained"
              onClick={resetDate}
              className="w-full md:w-fit"
            >
              {t('action.resetDate')}
            </Button>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" maxHeight={400}>
              <LineChart
                className="mt-8 w-full"
                width={500}
                height={300}
                data={history}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={['auto', (dataMax: number) => dataMax * 1.05]} />
                <Tooltip formatter={(value) => `${getFormatPrice(+value)}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#6418C3"
                  strokeWidth={6}
                  name={t('price')}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="box lg:w-1/3 flex flex-col">
          <div className="font-bold text-xl text-gray-300">
            {t('infoAbout', { name: ticker?.name })}
          </div>
          <List list={infoList} className="mt-6" />
          <Button
            as="button"
            uiColor="green"
            variant="contained"
            className="w-full mt-auto"
            onClick={() => modal.setIsOpen(true)}
          >
            {t('action.buy')}
          </Button>
        </div>
      </div>

      {modal.isOpen && ticker && (
        <BuyTickerModal
          tickerId={ticketId}
          item={ticker}
          {...modal.modalProps}
        />
      )}
    </PageContainer>
  );
};

export default Ticker;
