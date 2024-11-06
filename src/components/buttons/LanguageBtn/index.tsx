import React from 'react';
import ButtonIcon from '../ButtonIcon';
import { useParams } from 'next/navigation';
import LanguageIcon from '@/icons/LanguageIcon';
import { usePathname, useRouter } from '@/i18n/routing';
import Select from '@/components/Select';
import { StyledProps } from '@/components/types';
import { useLocale, useTranslations } from 'next-intl';

type Locale = {
  name: string;
  locale: string;
};

const locales: Locale[] = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: 'Русский',
    locale: 'ru',
  },
  {
    name: 'Белорусский',
    locale: 'be',
  },
];

const LanguageBtn = ({ className, style }: StyledProps) => {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  function handleChange(value: Locale) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      { pathname, params },
      { locale: value.locale },
    );
  }

  return (
    <div className={className} style={style}>
      <Select
        title={t('language.changeLang')}
        control={
          <ButtonIcon
            icon={LanguageIcon}
            aria-label={t('language.toggleLang')}
          />
        }
        options={locales}
        onChange={handleChange}
        optionAs={(value) => <div>{value.name}</div>}
        isActive={(value) => value.locale === locale}
      />
    </div>
  );
};

export default LanguageBtn;
