import authAxios, { axiosClient } from '@/services/axiosInstance';
import { AppDispatch } from '@/store';
import { TickerResponse } from './types';
import { tickerSlice } from '.';

export const fetchTickers = () => async (dispatch: AppDispatch) => {
  try {
    console.log('query smth')
    const data = await authAxios.get<TickerResponse>('/ticket', {params: {limit: 20}});
    // dispatch(tickerSlice.actions.fetchingSuccess(data.data.data));
  } catch (err) {
    console.log(err);
    console.log('fetch tickers error')
  }
};
