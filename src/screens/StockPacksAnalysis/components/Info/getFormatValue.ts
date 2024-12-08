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
    return getFormatNumber({
      style: 'percent',
      maximumFractionDigits: 3,
    }).format(data[key]);
  }

  if (key === 'sharpeRatio') {
    return getFormatNumber({ maximumFractionDigits: 3 }).format(data[key]);
  }

  return data[key];
}
