import failedAnimation from '@/animations/failed.json';
import { resetOtp } from '@/api/auth';
import Button from '@/components/buttons/Button';
import Modal from '@/components/Modal';
import Lottie from 'lottie-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import FormField from '../forms/FormField';
import Input from '../forms/Input';
import { Props } from './types';

const ResetOTPModal = ({ onSubmit, email, ...props }: Props) => {
  const t = useTranslations('otp');
  const tError = useTranslations('error');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  async function handleConfirm() {
    try {
      const { data } = await resetOtp({ resetKey: code, email });
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
    setCode(value || '');
  }

  return (
    <Modal header={t('resetTitle')} {...props}>
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
            disabled={!code.length}
          >
            {t('action.confirm')}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ResetOTPModal;
