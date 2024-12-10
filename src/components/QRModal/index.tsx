import { addOtp } from '@/api/auth';
import Button from '@/components/buttons/Button';
import Modal from '@/components/Modal';
import LoadingIcon from '@/icons/LoadingIcon';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { Props } from './types';
import DefaultError from '../errors/DefaultError';
import failedAnimation from '@/animations/failed.json';

import Lottie from 'lottie-react';
import Badge from '../Badge';
import useModal from '@/hooks/useModal';
import ConfirmOtpModal from '../ConfirmOTPModal';

const QrModal = ({ ...props }: Props) => {
  const t = useTranslations('otp');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const confirmOtp = useModal();

  async function fetchOtp() {
    try {
      const { data } = await addOtp();
      setUrl(data.otpUrl);
      setKey(data.otpResetKey);
    } catch (error) {
      console.log(error);
      setError('error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOtp();
  }, []);

  return (
    <Modal header={t('title')} {...props}>
      {isLoading && <LoadingIcon className="w-8 h-8 animate-spin mx-auto" />}
      {error && (
        <div>
          <Lottie
            loop={false}
            animationData={failedAnimation}
            className="w-32 h-32 md:w-48 md:h-48 mx-auto"
          />
          <div className="mt-3 text-xl md:text-3xl font-bold text-center">
            Error
          </div>
        </div>
      )}
      {!error && !isLoading && (
        <div className="flex h-full flex-col items-center">
          <QRCodeSVG value={url} />
          <div className="my-6 text-xl font-bold text-center">{key}</div>
          <Badge color={'red'} text={t('warning')} />
          <Button
            as="button"
            uiColor="primary"
            variant="contained"
            className="w-full mt-auto md:mt-9"
            onClick={() => confirmOtp.setIsOpen(true)}
            isLoading={isLoading}
          >
            {t('action.confirm')}
          </Button>
        </div>
      )}
      {confirmOtp.isOpen && (
        <ConfirmOtpModal
          onSubmit={async () => props.context.onOpenChange(false)}
          {...confirmOtp.modalProps}
        />
      )}
    </Modal>
  );
};

export default QrModal;
