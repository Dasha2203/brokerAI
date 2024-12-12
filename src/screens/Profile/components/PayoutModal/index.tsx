import Modal from '@/components/Modal';
import { Props } from './types';
import { useTranslations } from 'next-intl';
import FormField from '@/components/forms/FormField';
import Input from '@/components/forms/Input';
import { REGEX_NUMBER } from '@/const';
import { useState } from 'react';
import Button from '@/components/buttons/Button';

const PayoutModal = ({
  buttonText,
  amount,
  setAmount,
  onSubmit,
  ...props
}: Props) => {
  const t = useTranslations('profile');
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(value: string | null) {
    if (value && REGEX_NUMBER.test(value)) {
      setAmount(value);
    }

    if (!value) {
      setAmount('');
    }
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);
      await onSubmit();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal header={buttonText} {...props}>
      <FormField label={t('label.amount')} className="w-full">
        <Input onChange={handleChange} value={amount} className="w-full" />
      </FormField>

      <Button
        as="button"
        uiColor="primary"
        variant="contained"
        className="w-full mt-auto md:mt-9"
        disabled={!amount}
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        {buttonText}
      </Button>
    </Modal>
  );
};

export default PayoutModal;
