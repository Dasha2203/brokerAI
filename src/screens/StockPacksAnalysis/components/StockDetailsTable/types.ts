import { StockPackDetails } from '@/store/reducers/UserSlice/types';

export type ItemProps = {
  item: StockPackDetails;
  keys: (keyof StockPackDetails)[];
};
