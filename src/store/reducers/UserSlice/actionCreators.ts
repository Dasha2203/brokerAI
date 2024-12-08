import authAxios from '@/services/axiosInstance';
import { AppDispatch } from '@/store';
import {
  CreateStockPackCredentials,
  CreateStockPackResponse,
  ErrorCodeResponse,
  GetAnalysisStockPackResponse,
  RemoveStockPackCredentials,
  StockPackResponse,
  UpdateStockPackCredentials,
} from './types';
import { userSlice } from '.';

export const fetchStockPacks =
  ({
    StockPackName,
    limit,
    Offset,
  }: {
    StockPackName?: string;
    limit?: number;
    Offset?: number;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const data = await authAxios.get<StockPackResponse>('/stock-pack', {
        params: { limit, StockPackName, OnlyActive: true, Offset },
      });
      dispatch(userSlice.actions.fetchingSuccess(data.data));
    } catch (err) {
      console.log(err);
      console.log('fetch tickers error');
    }
  };

export const fetchStockPack =
  ({ stockPackId }: { stockPackId: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const data = await authAxios.get<StockPackResponse>(
        `/stock-pack/${stockPackId}`,
      );
      dispatch(userSlice.actions.fetchingSuccess(data.data.data));
    } catch (err) {
      console.log(err);
      console.log('fetch tickers error');
    }
  };

export const createStockPack =
  ({ color, stockPackName }: CreateStockPackCredentials) =>
  async (dispatch: AppDispatch) => {
    try {
      const data = await authAxios.post<CreateStockPackResponse>(
        '/stock-pack',
        {
          color,
          stockPackName,
        },
      );

      dispatch(
        userSlice.actions.addStockPack({
          stockPackId: data.data.data,
          stockPackName,
          color,
          active: true,
          totalCostStocks: 0,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

export const removeStockPack =
  ({ stockPackId }: RemoveStockPackCredentials) =>
  async (dispatch: AppDispatch) => {
    try {
      const data = await authAxios.delete(`/stock-pack/${stockPackId}`);

      dispatch(userSlice.actions.deleteStockPack({ stockPackId }));
    } catch (err) {
      console.log(err);
    }
  };

export const updateStockPack =
  ({ color, stockPackName, stockPackId }: UpdateStockPackCredentials) =>
  async (dispatch: AppDispatch) => {
    try {
      await authAxios.post<ErrorCodeResponse>(`/stock-pack/${stockPackId}`, {
        color,
        stockPackName,
      });

      dispatch(
        userSlice.actions.updateStockPack({
          color,
          stockPackId,
          stockPackName,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

export const getAnalysisStockPack =
  (stockPackId?: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await authAxios.get<GetAnalysisStockPackResponse>(
        '/stock-pack/analysis',
        {
          params: {
            stockPackId: stockPackId || null,
          },
        },
      );

      dispatch(userSlice.actions.fetchingAnalysisSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
