import { GetAnalysisStockPackResponse } from '@/store/reducers/UserSlice/types';
import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement>;

export type InfoStockPackKeys = Pick<
  GetAnalysisStockPackResponse['data'],
  | 'totalPrice'
  | 'boughtPrice'
  | 'revenue'
  | 'revenuePercentage'
  | 'riskFreeRate'
  | 'sharpeRatio'
>;
