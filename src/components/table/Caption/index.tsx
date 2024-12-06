import { Props } from './types';

const Caption = ({ text }: Props) => {
  return (
    <caption className="mb-7 text-gray-300 text-lg text-left">{text}</caption>
  );
};

export default Caption;
