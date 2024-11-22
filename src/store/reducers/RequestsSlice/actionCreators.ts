import authAxios from '@/services/axiosInstance';
import { AppDispatch } from '@/store';
import {
  RemoveRequestCredentials,
  RemoveRequestResponse,
  RequestsResponse,
} from './types';
import { requestSlice } from '.';

export const fetchRequests = () => async (dispatch: AppDispatch) => {
  try {
    console.log('here');
    const { data } = await authAxios.get<RequestsResponse>('/ticket/request', {
      params: {
        Limit: 5,
        StockPackId: '4956cc5a-c1ab-4a48-a7a2-8da75b65f6c3',
        TickerName: '',
        Offset: 0,
      },
    });
    dispatch(requestSlice.actions.fetchingSuccess(data.data));
  } catch (err) {
    console.log(err);
    console.log('fetch requests error');
  }
};

export const removeRequest =
  ({ requestId }: RemoveRequestCredentials) =>
  async (dispatch: AppDispatch) => {
    try {
      await authAxios.post<RemoveRequestResponse>(
        `/ticket/request/${requestId}`,
      );
      dispatch(requestSlice.actions.remove({ requestId }));
    } catch (err) {
      console.log(err);
      console.log('remover request error');
    }
  };
