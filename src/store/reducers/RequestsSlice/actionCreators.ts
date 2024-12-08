import authAxios from '@/services/axiosInstance';
import { AppDispatch } from '@/store';
import {
  RemoveRequestCredentials,
  RemoveRequestResponse,
  RequestsCredentials,
  RequestsResponse,
} from './types';
import { requestSlice } from '.';

export const fetchRequests =
  ({ Limit, Offset, TickerName }: RequestsCredentials) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await authAxios.get<RequestsResponse>(
        `/ticket/request?TickerName=${TickerName}`,
        {
          params: {
            Limit,
            Offset,
          },
        },
      );
      dispatch(requestSlice.actions.fetchingSuccess(data));
    } catch (err) {
      console.log(err);
      console.log('fetch requests error');
    }
  };

export const removeRequest =
  ({ requestId }: RemoveRequestCredentials) =>
  async (dispatch: AppDispatch) => {
    try {
      await authAxios.delete<RemoveRequestResponse>(
        `/ticket/request/${requestId}`,
      );
      dispatch(requestSlice.actions.remove({ requestId }));
    } catch (err) {
      console.log(err);
      console.log('remover request error');
    }
  };
