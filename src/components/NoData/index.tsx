import { useTranslations } from 'next-intl';
import { Props } from './types';

const NoData = ({ children }: Props) => {
  const t = useTranslations();
  return (
    <div className="m-auto flex flex-col justify-center items-center">
      <div className="font-bold text-2xl uppercase text-gray-300">
        {children || t('noData')}
      </div>
    </div>
  );
};

export default NoData;
