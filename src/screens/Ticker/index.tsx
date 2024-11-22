'use client';
import { tickerHistory, TickerHistoryItem } from '@/api/ticker';
import CustomDateRangePicker from '@/components/DatePicker';
import PageContainer from '@/components/ui/PageContainer';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import BuyTickerForm from './components/BuyTickerForm';

const Ticker = () => {
  const params = useParams();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [history, setHistory] = useState<TickerHistoryItem[]>([]);
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
      console.log('fetch: ', endDate);
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
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (endDate && startDate) {
      fetchHistory();
    }
  }, [endDate]);

  if (!ticketId) return null;

  return (
    <PageContainer>
      <h1 className="font-bold text-4xl">Ticker</h1>
      <div className="flex gap-11">
        <div className="py-11 px-10 flex-1 bg-white rounded-xl">
          <CustomDateRangePicker
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />
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
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#6418C3"
              strokeWidth={6}
            />
          </LineChart>
        </div>
        <div className="py-11 px-10 bg-white rounded-xl">
          <BuyTickerForm ticketId={ticketId} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Ticker;
