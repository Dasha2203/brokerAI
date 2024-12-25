import axios from '@/services/axiosInstance';
import {
  BuyTickerCredentials,
  BuyTickerResponse,
  SellTickerCredentials,
  SellTickerResponse,
  TickerHistoryCredentials,
  TickerHistoryResponse,
} from './types';

export const tickerHistory = async ({
  ticketId,
  StartAt,
  EndAt,
}: TickerHistoryCredentials) => {
  try {
    const { data } = await axios.get<TickerHistoryResponse>(
      `/ticket/${ticketId}/history?`,
      {
        params: {
          StartAt,
          EndAt,
        },
      },
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const buyTicker = async ({
  ticketId,
  stockPackId,
  price,
  count,
}: BuyTickerCredentials) => {
  try {
    const { data } = await axios.post<BuyTickerResponse>(
      `/ticket/request/${ticketId}/${stockPackId}/buy?price=${price}`,
      {
        count,
      },
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const sellTicker = async ({
  boughtTicketInStockPackId,
  stockPackId,
  ticketId,
  price,
}: SellTickerCredentials) => {
  try {
    const { data } = await axios.post<SellTickerResponse>(
      `/ticket/request/${boughtTicketInStockPackId}/sell?price=${price}`,
      {
        stockPackId,
        ticketId,
      },
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
