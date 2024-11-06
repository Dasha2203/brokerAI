export type Props<A> = {
  options: A[];
  title: string;
  control: React.ReactElement;
  onChange: (value: A) => void;
  optionAs: (value: A) => React.ReactNode;
  isActive: (value: A) => boolean;
};
