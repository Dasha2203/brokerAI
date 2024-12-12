import { ITicker } from "@/models/ITicker";

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
  data: {
    history: TickerHistoryItem[];
    ticket: ITicker;
  };
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

export type SellTickerCredentials = {
  boughtTicketInStockPackId: string;
  stockPackId: string;
  price: number;
  ticketId: string;
};

export type SellTickerResponse = {
  errorCode: string;
  data: string;
};
