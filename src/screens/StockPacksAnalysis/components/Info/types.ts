import { GetAnalysisStockPackResponse } from '@/store/reducers/UserSlice/types';

export type InfoStockPackKeys = Pick<
  GetAnalysisStockPackResponse['data'],
  | 'totalPrice'
  | 'boughtPrice'
  | 'revenue'
  | 'revenuePercentage'
  | 'riskFreeRate'
  | 'sharpeRatio'
>;
