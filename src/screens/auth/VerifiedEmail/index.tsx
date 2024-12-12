'use client';

import DefaultError from '@/components/errors/DefaultError';
import ChangePasswordForm from '@/components/forms/ChangePasswordForm';
import Title from '@/components/Title';
import LayoutContainer from '@/components/ui/LayoutContainer';
import PageContainer from '@/components/ui/PageContainer';
import Lottie from 'lottie-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import verifiedAnimation from '@/animations/verified.json';
import Box from '@/components/ui/Box';

const VerifiedEmail = () => {
  const t = useTranslations('auth');

  return (
    <PageContainer className="text-center">
      <Box className="m-auto">
        <Title text={t('emailVerified')} />
        <Lottie
          loop={false}
          animationData={verifiedAnimation}
          className="w-32 md:w-1/2 mx-auto"
        />
      </Box>
    </PageContainer>
  );
};

export default VerifiedEmail;
