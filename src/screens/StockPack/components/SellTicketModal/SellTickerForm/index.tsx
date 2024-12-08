import { useTranslations } from 'next-intl';
import Button from '@/components/buttons/Button';
import FormField from '@/components/forms/FormField';
import Input from '@/components/forms/Input';
import { Props } from './types';
import { REGEX_NUMBER } from '@/const';
import { useErrorBoundary } from 'react-error-boundary';
import clsx from 'clsx';
import { useState } from 'react';

const SellTickerForm = ({
  item,
  price,
  setPrice,
  handleSubmit,
  className,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const { showBoundary } = useErrorBoundary();

  function handleChange(value: string | null) {
    if (value && REGEX_NUMBER.test(value)) {
      setPrice(value);
    }

    if (!value) {
      setPrice('');
    }
  }

  async function handleClick() {
    try {
      setIsLoading(true);
      await handleSubmit();
    } catch (error) {
      showBoundary({ message: t('error.wrong') });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={clsx(className)}>
      <FormField label={t('tickers.input.price.label')} className="w-full">
        <Input
          placeholder={t('tickers.input.price.placeholder')}
          onChange={handleChange}
          value={price}
          className="w-full"
        />
      </FormField>

      <Button
        as="button"
        uiColor="primary"
        variant="contained"
        className="w-full mt-auto md:mt-9"
        disabled={!price}
        onClick={handleClick}
        isLoading={isLoading}
      >
        {t('tickers.sellTicker', { name: item.name })}
      </Button>
    </div>
  );
};

export default SellTickerForm;
