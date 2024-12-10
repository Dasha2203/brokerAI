import failedAnimation from '@/animations/failed.json';
import { confirmOtp } from '@/api/auth';
import Button from '@/components/buttons/Button';
import Modal from '@/components/Modal';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Props } from './types';

import { REGEX_NUMBER } from '@/const';
import Lottie from 'lottie-react';
import FormField from '../forms/FormField';
import Input from '../forms/Input';

const ConfirmOtpModal = ({ codeKey, onSubmit, ...props }: Props) => {
  const t = useTranslations('otp');
  const tError = useTranslations('error');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState(codeKey || '');
  console.log(codeKey);

  async function handleConfirm() {
    try {
      const { data } = await confirmOtp({ code });
      if (data.errorCode === 'IncorrectOtp') {
        setError(tError('IncorrectOtp'));
      }

      if (!data.errorCode) {
        onSubmit();
      }
    } catch (error) {
      console.log(error);
      setError(tError('wrong'));
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(value: string | null) {
    console.log();
    if (value && REGEX_NUMBER.test(value) && value.length <= 6) {
      setCode(value);
    }

    if (!value) {
      setCode('');
    }
  }

  return (
    <Modal header={t('confirmTitle')} {...props}>
      {error && (
        <div>
          <Lottie
            loop={false}
            animationData={failedAnimation}
            className="w-32 h-32 md:w-48 md:h-48 mx-auto"
          />
          <div className="mt-3 text-xl md:text-3xl font-bold text-center">
            {error}
          </div>
        </div>
      )}

      {!error && !isLoading && (
        <div className="flex flex-col items-center">
          <FormField label={t('enterCode')} className="w-full">
            <Input
              onChange={handleChange}
              value={code}
              className="w-full text-center"
            />
          </FormField>
          <Button
            as="button"
            uiColor="primary"
            variant="contained"
            className="w-full mt-auto md:mt-9"
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={code.length < 6}
          >
            {t('action.confirm')}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ConfirmOtpModal;
