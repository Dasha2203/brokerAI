import { StockPackDetails } from '@/store/reducers/UserSlice/types';
import { getFormatNumber } from '@/utils/getFormatNumber';
import { getFormatPrice } from '@/utils/getFormatPrice';

export function getFormatValue(
  item: StockPackDetails,
  key: keyof StockPackDetails,
) {
  if (key === 'currentPrice' || key === 'boughtPrice') {
    return getFormatPrice(item[key]);
  }

  if (key === 'revenue') {
    return (
      getFormatPrice(item[key]) +
      ` (${getFormatNumber({ style: 'percent' }).format(item['revenuePercentage'])})`
    );
  }

  return item[key];
}
