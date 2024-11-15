import { IStockPack } from '@/models/IStockPack';

export type ErrorCodeResponse = {
  errorCode: string;
};

export type StockPackResponse = ErrorCodeResponse & {
  data: IStockPack[];
  total: number;
};

export type CreateStockPackCredentials = {
  color: string;
  stockPackName: string;
};

export type UpdateStockPackCredentials = {
  stockPackId: string;
  stockPackName: string;
  color: string;
};

export type CreateStockPackResponse = ErrorCodeResponse & {
  data: string;
};

export type RemoveStockPackCredentials = {
  stockPackId: string;
};
