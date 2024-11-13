import { ITicker } from '@/models/ITicker';

export type ErrorCodeResponse = {
  errorCode: string;
};

export type TickerResponse = ErrorCodeResponse & {
  data: ITicker[];
  total: number;
};

export type AddBookmarkTickerResponse = ErrorCodeResponse;
export type RemoveBookmarkTickerResponse = ErrorCodeResponse;
