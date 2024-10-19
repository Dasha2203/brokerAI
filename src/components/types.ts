export type StyledProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type InputProps<A> = {
  id?: string;
  value: A | null;
  onChange: (value: A | null) => void;
  onBlur?: (event?: React.FocusEvent) => void;
  isInvalid?: boolean;
  disabled?: boolean;
};
