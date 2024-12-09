import { ITicker } from '@/models/ITicker';
import { getFormatPrice } from '@/utils/getFormatPrice';

export function getFormatValue(item: ITicker, key: keyof ITicker) {
  if (key === 'actualPrice') {
    return getFormatPrice(item[key]);
  }
  // if (key === 'boughtAt') {
  //   const formater = new Intl.DateTimeFormat('en-GB', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //   });
  //   return formater.format(new Date(item[key]));
  // }

  return item[key];
}
