import authAxios from '@/services/axiosInstance';
import { GetAnalysisStockPackResponse, GetSpecificStockPackResponse, GetStockPackCredentials } from './types';

export const getStockpack = async ({
  stockPackId,
}: GetStockPackCredentials) => {
  try {
    const { data } = await authAxios.get<GetSpecificStockPackResponse>(
      `/stock-pack/${stockPackId}/`,
      {
        params: {
          Limit: 5,
        },
      },
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getAnalysisStockPack = async ({
  stockPackId,
}: {
  stockPackId?: string;
}) => {
  try {
    const { data } = await authAxios.get<GetAnalysisStockPackResponse>(
      '/stock-pack/analysis',
      {
        params: {
          stockPackId: stockPackId || null,
        },
      },
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
