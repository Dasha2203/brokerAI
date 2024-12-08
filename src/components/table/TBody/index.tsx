import clsx from 'clsx';
import { Props } from './types';

const TBody = ({ children, className, style, ...props }: Props) => {
  return (
    <tbody className={clsx(className)} style={style} {...props}>
      {children}
    </tbody>
  );
};

export default TBody;
