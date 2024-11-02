'use client';
import DefaultError from '@/components/errors/DefaultError';
import ChangePasswordForm from '@/components/forms/ChangePasswordForm';
import LayoutContainer from '@/components/ui/LayoutContainer';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ResetPassword = () => {
  return (
    <div className="flex flex-col justify-center min-h-full-screen">
      <LayoutContainer className="py-3 md:py-7">
        <div className="mx-auto p-6 md:p-12 md:max-w-[512px] w-full bg-white dark:bg-violet-500 rounded-xl">
          <h1 className="mb-10 font-bold text-3xl md:text-4xl text-center ">
            Reset password
          </h1>
          <ErrorBoundary
            FallbackComponent={(props) => (
              <DefaultError {...props} className="my-auto" />
            )}
          >
            <ChangePasswordForm />
          </ErrorBoundary>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default ResetPassword;
