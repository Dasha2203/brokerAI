import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import Box from '@/components/ui/Box';
import { Props } from './types';
import RequestResetPasswrodModal from '@/screens/auth/components/RequestResetPasswrodModal';
import useModal from '@/hooks/useModal';
import Button from '@/components/buttons/Button';
import StripePriceModal from '../StripePriceModal';
import PayoutModal from '../PayoutModal';
import { payout, sendVerificationEmail, topUp } from '@/api/user';
import QrModal from '@/components/QRModal';
import { removeOtp } from '@/api/auth';
import { ErrorEnum } from '@/types/error';
import ConfirmOtpModal from '@/components/ConfirmOTPModal';
import ResetOTPModal from '@/components/ResetOTPModal';

const ActionsPanel = ({ user, billingInfo, className }: Props) => {
  const t = useTranslations('profile');
  const [isPayment, setIsPayment] = useState<'payout' | 'topup' | null>(null);
  const [amount, setAmount] = useState('');
  const restoreModal = useModal();
  const pricingModal = useModal();
  const paymentModal = useModal();
  const otpModal = useModal();
  const confirmOtpModal = useModal();
  const resetOtpModal = useModal();

  const list = useMemo(() => {
    return [
      ...(!user.emailVerified
        ? [
            {
              label: t('label.email'),
              value: (
                <Button
                  as="button"
                  size="sm"
                  uiColor="primary"
                  variant="contained"
                  onClick={sendVerificationEmail}
                >
                  {t('action.verify')}
                </Button>
              ),
            },
          ]
        : []),
      {
        label: t('label.password'),
        value: (
          <Button
            as="button"
            size="sm"
            uiColor="primary"
            variant="contained"
            onClick={() => restoreModal.setIsOpen(true)}
          >
            {t('action.restore')}
          </Button>
        ),
      },
      {
        label: t('label.stripe'),
        value: (
          <>
            {billingInfo?.expressOnboardingCompleted ? (
              <Button
                as="link"
                href={billingInfo?.expressPortalUrl || ''}
                variant="contained"
                uiColor="primary"
                target="_blank"
                size="sm"
              >
                {t('action.connectStripe')}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  as="link"
                  href={billingInfo?.customerPortalUrl || ''}
                  variant="contained"
                  uiColor="primary"
                  target="_blank"
                  size="sm"
                >
                  {t('action.manageStripe')}
                </Button>
                <Button
                  as="button"
                  variant="contained"
                  uiColor="primary"
                  size="sm"
                  onClick={() => {
                    paymentModal.setIsOpen(true);
                    setIsPayment('topup');
                  }}
                >
                  {t('action.topUp')}
                </Button>
                <Button
                  as="button"
                  variant="contained"
                  uiColor="primary"
                  size="sm"
                  onClick={() => {
                    paymentModal.setIsOpen(true);
                    setIsPayment('payout');
                  }}
                >
                  {t('action.payOut')}
                </Button>
                <Button
                  as="button"
                  variant="contained"
                  uiColor="primary"
                  size="sm"
                  onClick={() => pricingModal.setIsOpen(true)}
                >
                  {t('action.manageSubscription')}
                </Button>
              </div>
            )}
          </>
        ),
      },
      {
        label: t('label.2FA'),
        value: !user.otpConnected ? (
          <Button
            as="button"
            variant="contained"
            uiColor="primary"
            size="sm"
            onClick={() => otpModal.setIsOpen(true)}
          >
            {t('action.addOtp')}
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              as="button"
              uiColor="primary"
              variant="contained"
              size="sm"
              onClick={() => resetOtpModal.setIsOpen(true)}
            >
              {t('action.reset')}
            </Button>
            <Button
              as="button"
              uiColor="danger"
              variant="contained"
              size="sm"
              onClick={handleRemoveOtp}
            >
              {t('action.remove')}
            </Button>
          </div>
        ),
      },
      {
        label: t('label.transactions'),
        value: (
          <Button
            as="link"
            href={'/profile/transactions'}
            variant="contained"
            uiColor="primary"
            size="sm"
          >
            {t('action.show')}
          </Button>
        ),
      },
    ];
  }, [billingInfo, pricingModal, user]);

  async function handlePayment() {
    try {
      if (isPayment === 'payout') {
        await payout({ amount: Number(amount) });
      }
      if (isPayment === 'topup') {
        const url = await topUp({ amount: Number(amount) });
        window.open(url, '_blank');
      }

      paymentModal.setIsOpen(false);
      setIsPayment(null);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveOtp() {
    try {
      const { errorCode } = await removeOtp();
      if (errorCode === ErrorEnum.RequireOtpSetup) {
        confirmOtpModal.setIsOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box className={clsx(className)}>
      <div className="font-bold text-2xl">{t('actions')}</div>
      <ul className="mt-8">
        {list.map(({ label, value }, idx) => (
          <li key={idx} className="py-1 my-1 flex justify-between items-center">
            <span className="uppercase font-bold text-gray-300">{label}</span>
            {value}
          </li>
        ))}
      </ul>

      {restoreModal.isOpen && (
        <RequestResetPasswrodModal {...restoreModal.modalProps} />
      )}
      {pricingModal.isOpen && billingInfo && (
        <StripePriceModal
          pricingTableId={'prctbl_1PZw5KGbPoGTWmP6ryXjFHKc'}
          sessionSecret={billingInfo.customerSessionSecret}
          publishableKey={
            'pk_test_51PZuzWGbPoGTWmP6TiTH47UqHdjbMD3Ks5jeoizL1JjCHlCU52sltVl1JD7NDU1zYJ7cOcSfKMaKMoYzlscOpAye00zRW5TsMv'
          }
          {...pricingModal.modalProps}
        />
      )}
      {paymentModal.isOpen && isPayment && (
        <PayoutModal
          amount={amount}
          setAmount={setAmount}
          onSubmit={handlePayment}
          buttonText={
            isPayment === 'topup' ? t('action.topUp') : t('action.payOut')
          }
          {...paymentModal.modalProps}
        />
      )}
      {otpModal.isOpen && <QrModal {...otpModal.modalProps} />}
      {confirmOtpModal.isOpen && (
        <ConfirmOtpModal
          onSubmit={async () => {
            confirmOtpModal.setIsOpen(false);
            removeOtp();
          }}
          {...confirmOtpModal.modalProps}
        />
      )}
      {resetOtpModal.isOpen && (
        <ResetOTPModal
          email={user.email}
          onSubmit={async () => {
            resetOtpModal.setIsOpen(false);
          }}
          {...resetOtpModal.modalProps}
        />
      )}
    </Box>
  );
};

export default ActionsPanel;
