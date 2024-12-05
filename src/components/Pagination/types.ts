import { StyledProps } from '@/types/ui';

export type Props = StyledProps & {
  active: number;
  total: number;
  count: number;
  setActive: (value: number) => void;
  // visible: number;
};
