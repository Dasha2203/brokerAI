export type Request = {
  requestId: string;
  requestType: string;
  tickerName: string;
  createdAt: string;
  price: number;
};

export type RequestsResponse = {
  errorCode: string;
  data: Request[];
  total: number;
};

export type RequestsCredentials = {
  Limit: number;
  TickerName: string;
  Offset: number;
};

export type RemoveRequestCredentials = {
  requestId: string;
};

export type RemoveRequestResponse = {
  errorCode: string;
};
