import authAxios from '@/services/axiosInstance';
import { GetSpecificStockPackResponse, GetStockPackCredentials } from './types';
import { StockPackResponse } from '@/store/reducers/UserSlice/types';

export const getStockpack = async ({
  stockPackId,
  Limit,
  Offset,
}: GetStockPackCredentials) => {
  try {
    const { data } = await authAxios.get<GetSpecificStockPackResponse>(
      `/stock-pack/${stockPackId}/tickets`,
      {
        params: {
          Limit: Limit,
          Offset,
        },
      },
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getInfoStockpack = async ({
  stockPackId,
}: {
  stockPackId: string;
}) => {
  try {
    const { data } = await authAxios.get<StockPackResponse>('/stock-pack/', {
      params: {
        stockPackId,
        Limit: 10,
        Offset: 0,
      },
    });

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
