import authAxios from '@/services/axiosInstance';
import { AppDispatch } from '@/store';
import { AddBookmarkTickerResponse, RemoveBookmarkTickerResponse, TickerResponse } from './types';
import { tickerSlice } from '.';

export const fetchTickers =
  ({ TicketName }: { TicketName?: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log('query smth');
      const data = await authAxios.get<TickerResponse>('/ticket', {
        params: { limit: 5, TicketName },
      });
      dispatch(tickerSlice.actions.fetchingSuccess(data.data.data));
    } catch (err) {
      console.log(err);
      console.log('fetch tickers error');
    }
  };

export const AddBookmarkTicker =
  ({ ticketId }: { ticketId?: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log('query smth');
      const data = await authAxios.post<AddBookmarkTickerResponse>(
        `/ticket/${ticketId}/bookmark`,
      );
      dispatch(tickerSlice.actions.fetchingSuccess(data.data.data));
    } catch (err) {
      console.log(err);
      console.log('fetch tickers error');
    }
  };

export const removeBookmarkTicker =
  ({ ticketId }: { ticketId?: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log('query smth');
      const data = await authAxios.delete<RemoveBookmarkTickerResponse>(
        `/ticket/${ticketId}/bookmark`,
      );
      dispatch(tickerSlice.actions.fetchingSuccess(data.data.data));
    } catch (err) {
      console.log(err);
      console.log('fetch tickers error');
    }
  };
