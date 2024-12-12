export type CustomInputProps = {
  placeholder: string;
  onClick: React.MouseEventHandler<HTMLElement> | undefined;
  ref: React.Ref<HTMLDivElement>;
  className?: string;
};

export type Props = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (value: Date | undefined) => void;
  setEndDate: (value: Date | undefined) => void;
};
