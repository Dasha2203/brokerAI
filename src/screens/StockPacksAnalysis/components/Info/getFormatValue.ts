import { GetAnalysisStockPackResponse } from '@/store/reducers/UserSlice/types';
import { getFormatNumber } from '@/utils/getFormatNumber';
import { getFormatPrice } from '@/utils/getFormatPrice';
import { InfoStockPackKeys } from './types';

export function getFormatValue(
  data: GetAnalysisStockPackResponse['data'],
  key: keyof InfoStockPackKeys,
) {
  if (key === 'totalPrice' || key === 'boughtPrice' || key === 'revenue') {
    return getFormatPrice(data[key]);
  }

  if (key === 'revenuePercentage' || key === 'riskFreeRate') {
    return getFormatNumber({ style: 'percent' }).format(data[key]);
  }

  return data[key];
}
