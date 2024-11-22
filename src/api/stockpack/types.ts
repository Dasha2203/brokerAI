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
