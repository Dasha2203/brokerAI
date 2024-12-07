import authAxios from '@/services/axiosInstance';
import { AppDispatch } from '@/store';
import {
  AddBookmarkTickerResponse,
  RemoveBookmarkTickerResponse,
  TickerResponse,
  TickersCredentials,
} from './types';
import { tickerSlice } from '.';

export const fetchTickers =
  ({
    TicketName,
    Limit = 20,
    Offset = 0,
    OnlyFavorite = false,
  }: TickersCredentials) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log('query smth');
      const data = await authAxios.get<TickerResponse>('/ticket', {
        params: { limit: Limit, TicketName, Offset, OnlyFavorite },
      });
      dispatch(tickerSlice.actions.fetchingSuccess(data.data));
    } catch (err) {
      console.log(err);
      console.log('fetch tickers error');
    }
  };

export const AddBookmarkTicker =
  ({ stockId }: { stockId: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log('query smth');
      const data = await authAxios.post<AddBookmarkTickerResponse>(
        `/ticket/${stockId}/bookmark`,
      );
      dispatch(tickerSlice.actions.addToBookmark(stockId));
    } catch (err) {
      console.log(err);
      console.log('fetch tickers error');
    }
  };

export const removeBookmarkTicker =
  ({ stockId }: { stockId: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const data = await authAxios.delete<RemoveBookmarkTickerResponse>(
        `/ticket/${stockId}/bookmark`,
      );
      dispatch(tickerSlice.actions.deleteFromBookmark(stockId));
    } catch (err) {
      console.log(err);
      console.log('fetch tickers error');
    }
  };
