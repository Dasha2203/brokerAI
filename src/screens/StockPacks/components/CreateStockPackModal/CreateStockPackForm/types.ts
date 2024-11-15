import { IStockPack } from '@/models/IStockPack';

export type FormValues = {
  name: string;
};

export type EditStockPackProps = Partial<IStockPack>;

export type Props = {
  onSubmit: () => void;
  data?: EditStockPackProps;
};
