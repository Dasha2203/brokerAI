import clsx from 'clsx';
import { Props } from './types';

const Box = ({ className, children, ...props }: Props) => {
  return (
    <div className={clsx('box', className)} {...props}>
      {children}
    </div>
  );
};

export default Box;
