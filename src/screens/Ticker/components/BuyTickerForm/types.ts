export type FormValues = {
  count: string;
  price: string;
};

export type Props = {
  ticketId: string;
  className?: string;
  onSubmit: () => void;
};
