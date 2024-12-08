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

export type StockPackDetails = {
  ticker: string;
  name: string;
  sectorKey: string;
  industryKey: string;
  boughtAt: string;
  boughtPrice: number;
  currentPrice: number;
  revenue: number;
  revenuePercentage: number;
};

export type GetAnalysisStockPackResponse = {
  errorCode: string;
  data: {
    totalPrice: number;
    boughtPrice: number;
    revenue: number;
    revenuePercentage: number;
    countStocks: number;
    riskFreeRate: number;
    sharpeRatio: number;
    diversificationLevel: unknown;
    sumByStock: [
      {
        key: string;
        totalBoughtPrice: number;
        currentPrice: number;
        revenue: number;
        revenuePercentage: number;
      },
    ];
    sumByIndustry: [
      {
        key: string;
        totalBoughtPrice: number;
        currentPrice: number;
        revenue: number;
        revenuePercentage: number;
      },
    ];
    stockDetails: StockPackDetails[];
  };
};
