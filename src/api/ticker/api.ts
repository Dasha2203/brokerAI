import authAxios from '@/services/axiosInstance';
import {
  BuyTickerCredentials,
  BuyTickerResponse,
  TickerHistoryCredentials,
  TickerHistoryResponse,
} from './types';

export const tickerHistory = async ({
  ticketId,
  StartAt,
  EndAt,
}: TickerHistoryCredentials) => {
  try {
    const { data } = await authAxios.get<TickerHistoryResponse>(
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
    const { data } = await authAxios.post<BuyTickerResponse>(
      `/ticket/request/${ticketId}/${stockPackId}/buy`,
      {
        price,
        count,
      },
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
