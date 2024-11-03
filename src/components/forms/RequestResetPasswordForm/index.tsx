import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormValues, Props } from './types';
import useForm from '@/hooks/useForm';
import FormField from '../FormField';
import Input from '../Input';
import Button from '@/components/buttons/Button';
import { useErrorBoundary } from 'react-error-boundary';
import Lottie from 'lottie-react';
import emailSuccess from '@/animations/email-success.json';
import { resetPassword } from '@/api/auth';
import { useTranslations } from 'next-intl';

const RequestResetPasswordForm = ({ email, onCancel }: Props) => {
  const tAuth = useTranslations('auth');
  const tButtons = useTranslations('button');
  const tError = useTranslations('auth.error');
  const tSuccess = useTranslations('success');
  const tCommonError = useTranslations('error');

  const [isSuccess, setIsSuccess] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const { getFieldProps, getFieldMeta, handleSubmit, isSubmitting } =
    useForm<FormValues>({
      initialValues: {
        email: email || '',
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email(tError('email.format'))
          .required(tError('required')),
      }),
      onSubmit: async (values) => {
        try {
          const { email } = values;

          if (!email) {
            return;
          }
          const { errorCode } = await resetPassword({ email });
          setIsSuccess(true);
        } catch (err) {
          showBoundary({ message: tCommonError('wrong') });
        }
      },
    });

  if (isSuccess) {
    return (
      <div className="text-center my-auto">
        <Lottie
          loop={false}
          animationData={emailSuccess}
          className="w-32 h-32 md:w-48 md:h-48 mx-auto"
        />
        <div className="mt-3 text-xl md:text-3xl font-bold text-center">
          {tSuccess('checkEmail')}
        </div>
        <p className="mt-2 text-base md:text-xl">{tSuccess('sendedCode')}</p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col flex-1"
      onSubmit={(e) => {
        if (isSubmitting) {
          return;
        }
        handleSubmit(e);
      }}
    >
      <FormField label={tAuth('input.email.label')} {...getFieldMeta('email')}>
        <Input
          error={getFieldMeta('email').error}
          className={'w-full'}
          placeholder={tAuth('input.email.placeholder')}
          {...getFieldProps('email')}
        />
      </FormField>
      <div className="mt-auto md:mt-12 flex flex-col md:flex-row gap-4 md:gap-8">
        <Button
          as="button"
          variant="outlined"
          uiColor="primary"
          onClick={onCancel}
          fixedSize
          className="flex-1"
        >
          {tButtons('cancel')}
        </Button>
        <Button
          as="button"
          type="submit"
          uiColor="primary"
          variant="contained"
          className="flex-1"
          fixedSize
          isLoading={isSubmitting}
        >
          {tAuth('button.sendCode')}
        </Button>
      </div>
    </form>
  );
};

export default RequestResetPasswordForm;
