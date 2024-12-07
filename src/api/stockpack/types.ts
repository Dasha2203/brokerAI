export type GetStockPackCredentials = {
  stockPackId: string;
};

export type SpecificStockPack = {
  stockId: string;
  boughtAt: string;
  boughtPrice: number;
  ticker: string;
  name: string;
  sectorKey: string;
  industryKey: string;
  actualPrice: number;
};

export type GetSpecificStockPackResponse = {
  errorCode: string;
  data: SpecificStockPack[];
  total: number;
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
    stockDetails: [
      {
        ticker: string;
        name: string;
        sectorKey: string;
        industryKey: string;
        boughtAt: string;
        boughtPrice: number;
        currentPrice: number;
        revenue: number;
        revenuePercentage: number;
      },
    ];
  };
};
