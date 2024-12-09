import Title from '@/components/Title';
import Box from '@/components/ui/Box';
import { Props } from './types';
import Badge from '@/components/Badge';
import Button from '@/components/buttons/Button';
import { useEffect, useMemo } from 'react';
import StripePricingTable from '../StripePricingTable';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const UserInfo = ({ user, billingInfo, className }: Props) => {
  const t = useTranslations('profile');

  const list = useMemo(() => {
    return [
      {
        label: t('label.email'),
        value: (
          <div className="flex items-center gap-4">
            <Badge
              size="xs"
              color={user.emailVerified ? 'green' : 'red'}
              text={user.emailVerified ? t('verified') : t('notVerified')}
              className="uppercase"
            />
            <span>{user.email}</span>
          </div>
        ),
      },
      {
        label: t('label.name'),
        value: user.firstname,
      },
      {
        label: t('label.lastName'),
        value: user.lastname,
      },
      {
        label: t('label.country'),
        value: user.countryCode,
      },
      {
        label: t('label.language'),
        value: user.languageCode,
      },
      {
        label: t('label.2FA'),
        value: (
          <Badge
            size="xs"
            color={user.otpConnected ? 'green' : 'red'}
            text={user.otpConnected ? t('connected') : t('notConnected')}
            className="uppercase"
          />
        ),
      },
      {
        label: t('label.stripe'),
        value: (
          <Badge
            size="xs"
            color={user.otpConnected ? 'green' : 'red'}
            text={user.otpConnected ? t('connected') : t('notConnected')}
            className="uppercase"
          />
        ),
      },
    ];
  }, []);

  return (
    <Box className={clsx(className)}>
      <Title text={t('myProfile')} />

      <ul className="mt-8 text-base">
        {list.map((i, idx) => (
          <li key={idx} className="py-1 flex justify-between font-semibold">
            <span className="uppercase text-gray-300 font-bold">{i.label}</span>
            {i.value}
          </li>
        ))}
        {/* {billingInfo && (
          <li className="flex justify-between">
            <span>Stripe</span>
            <div className="flex items-center">
              <Button
                as="link"
                href={billingInfo.customerPortalUrl}
                variant="contained"
                uiColor="primary"
                target="_blank"
              >
                Customer
              </Button>
              {!billingInfo.expressOnboardingCompleted && (
                <Button
                  as="link"
                  href={billingInfo.expressPortalUrl}
                  variant="contained"
                  uiColor="primary"
                  target="_blank"
                >
                  Connect stripe
                </Button>
              )}
              <Badge
                size="xs"
                color={billingInfo.expressOnboardingCompleted ? 'green' : 'red'}
                text={
                  billingInfo?.expressOnboardingCompleted
                    ? 'Connected'
                    : 'Not connected'
                }
                className="uppercase"
              />
            </div>
          </li>
        )} */}
      </ul>

      {/* {billingInfo && (
        <StripePricingTable
          pricingTableId={'prctbl_1PZw5KGbPoGTWmP6ryXjFHKc'}
          sessionSecret={billingInfo.customerSessionSecret}
          publishableKey={
            'pk_test_51PZuzWGbPoGTWmP6TiTH47UqHdjbMD3Ks5jeoizL1JjCHlCU52sltVl1JD7NDU1zYJ7cOcSfKMaKMoYzlscOpAye00zRW5TsMv'
          }
        />
      )} */}
    </Box>
  );
};

export default UserInfo;
