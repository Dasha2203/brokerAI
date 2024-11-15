import { ITicker } from '@/models/ITicker';

export type ErrorCodeResponse = {
  errorCode: string;
};

export type Ticker = ITicker & {
  bookmarked: boolean;
};

export type TickerResponse = ErrorCodeResponse & {
  data: Ticker[];
  total: number;
};

export type AddBookmarkTickerResponse = ErrorCodeResponse;
export type RemoveBookmarkTickerResponse = ErrorCodeResponse;
