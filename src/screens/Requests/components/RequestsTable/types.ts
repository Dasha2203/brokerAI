import { Request } from '@/store/reducers/RequestsSlice/types';

export type RequestItemProps = {
  item: Request;
  onRemove: (value: { requestId: string }) => void;
};
