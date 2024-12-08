import { SpecificStockPack } from '@/api/stockpack';
import { getFormatPrice } from '@/utils/getFormatPrice';

export function getFormatValue(
  item: SpecificStockPack,
  key: keyof SpecificStockPack,
) {
  if (key === 'actualPrice' || key === 'boughtPrice') {
    return getFormatPrice(item[key]);
  }
  if (key === 'boughtAt') {
    const formater = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formater.format(new Date(item[key]));
  }

  return item[key];
}
