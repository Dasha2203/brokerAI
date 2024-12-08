import { ITicker } from '@/models/ITicker';

export type ErrorCodeResponse = {
  errorCode: string;
};

export type Ticker = ITicker & {
  bookmarked: boolean;
};

export type TickersCredentials = {
  TicketName?: string;
  Limit?: number;
  Offset?: number;
  OnlyFavorite?: boolean;
};

export type TickerResponse = ErrorCodeResponse & {
  data: Ticker[];
  total: number;
};

export type AddBookmarkTickerResponse = ErrorCodeResponse;
export type RemoveBookmarkTickerResponse = ErrorCodeResponse;
