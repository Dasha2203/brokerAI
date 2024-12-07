import { Ticker } from '@/store/reducers/TickerSlice/types';

export type TickerItemProps = {
  ticker: Ticker;
  handleBookmark: (value: { bookmarked: boolean; stockId: string }) => void;
};
