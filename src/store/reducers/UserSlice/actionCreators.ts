import authAxios from '@/services/axiosInstance';
import { AppDispatch } from '@/store';
import {
  CreateStockPackCredentials,
  CreateStockPackResponse,
  ErrorCodeResponse,
  RemoveStockPackCredentials,
  StockPackResponse,
  UpdateStockPackCredentials,
} from './types';
import { userSlice } from '.';

export const fetchStockPacks =
  ({ StockPackName }: { StockPackName?: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const data = await authAxios.get<StockPackResponse>('/stock-pack', {
        params: { limit: 5, StockPackName, OnlyActive: true },
      });
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