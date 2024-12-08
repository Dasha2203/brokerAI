import { Props } from './types';

const Title = ({ text }: Props) => {
  return <h1 className="font-bold text-4xl">{text}</h1>;
};

export default Title;
