export type Request = {
  requestId: string;
  requestType: number;
  tickerName: string;
  createdAt: string;
  price: number;
};

export type RequestsResponse = {
  errorCode: string;
  data: Request[];
  total: number;
};

export type RemoveRequestCredentials = {
  requestId: string;
};

export type RemoveRequestResponse = {
  errorCode: string;
};
