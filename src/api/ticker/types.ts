export type TickerHistoryCredentials = {
  ticketId: string;
  StartAt?: string;
  EndAt?: string;
};

export type TickerHistoryItem = {
  timestamp: string;
  price: number;
};

export type TickerHistoryResponse = {
  errorCode: string;
  data: TickerHistoryItem[];
};

export type BuyTickerResponse = {
  errorCode: string;
  data: string[];
};

export type BuyTickerCredentials = {
  ticketId: string;
  stockPackId: string;
  price: number;
  count: number;
};
