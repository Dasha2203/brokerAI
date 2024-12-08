import { StyledProps } from '@/types/ui';
import { MutableRefObject } from 'react';

export type Props = StyledProps & {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  color?: string;
  onChangeColor: (value: string) => void;
};
