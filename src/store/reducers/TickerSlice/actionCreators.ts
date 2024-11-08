import authAxios from '@/services/axiosInstance';
import { AppDispatch } from '@/store';
import { TickerResponse } from './types';

export const fetchTickers = () => async (dispatch: AppDispatch) => {
  try {
    const data = await authAxios.get<TickerResponse>('/api/ticket');
  } catch (err) {
    console.log(err);
  }
};
