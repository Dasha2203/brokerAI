import React, { useMemo, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useSearchParams, redirect } from 'next/navigation';
import * as Yup from 'yup';

import useForm from '@/hooks/useForm';
import { FormValues } from './types';
import PasswordInput from '../PasswordInput';
import FormField from '../FormField';
import Button from '@/components/buttons/Button';
import { changePassword } from '@/api/auth';
import SuccessQuery from '@/components/SuccessQuery';
import { useTranslations } from 'next-intl';

const minCountPass = 6;

const ChangePasswordForm = () => {
  const tAuth = useTranslations('auth');
  const tCommonError = useTranslations('error');
  const tError = useTranslations('auth.error');
  const [isSuccess, setIsSuccess] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const params = useSearchParams();
  const code = params.get('code');
  const {
    getFieldMeta,
    getFieldProps,
    handleSubmit,
    isSubmitting,
    setFieldError,
  } = useForm<FormValues>({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(minCountPass, tError('password.min', { count: minCountPass }))
        .nullable()
        .required(tError('required')),
      repeatPassword: Yup.string()
        .min(minCountPass, tError('password.min', { count: minCountPass }))
        .nullable()
        .required(tError('required')),
    }),
    onSubmit: async (values) => {
      const { password, repeatPassword } = values;

      if (!password || !repeatPassword || !code) {
        return;
      }

      if (password !== repeatPassword) {
        setFieldError('repeatPassword', tError('password.equals'));
        return;
      }

      try {
        await changePassword({
          newPassword: password,
          code,
        });
        setIsSuccess(true);
      } catch (err) {
        showBoundary({ message: tCommonError('wrong') });
      }
    },
  });

  const formFields: {
    label: string;
    field: keyof FormValues;
    rightNode?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
  }[] = useMemo(
    () => [
      {
        label: 'password',
        field: 'password',
        component: PasswordInput,
      },
      {
        label: 'repeatPassword',
        field: 'repeatPassword',
        component: PasswordInput,
      },
    ],
    [],
  );

  if (!code) {
    return redirect('/auth/register');
  }

  if (isSuccess) {
    return (
      <SuccessQuery
        message="Password successfully changed"
        children={
          <Button
            as="link"
            href="/auth/login"
            variant="contained"
            fixedSize
            uiColor="primary"
            className="w-full block"
          >
            {tAuth('button.signIn')}
          </Button>
        }
      />
    );
  }

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={(e) => {
        if (isSubmitting) {
          return;
        }
        handleSubmit(e);
      }}
    >
      {formFields.map(({ field, component: Field, label, rightNode }, idx) => (
        <FormField
          label={tAuth(`input.${label}.label`)}
          rightNode={rightNode}
          key={idx}
          {...getFieldMeta(field)}
        >
          <Field
            className={'w-full'}
            placeholder={tAuth(`input.${label}.placeholder`)}
            {...getFieldProps(field)}
          />
        </FormField>
      ))}
      <Button
        as="button"
        uiColor="primary"
        variant="contained"
        fixedSize
        className="w-full"
        type="submit"
        isLoading={isSubmitting}
      >
        {tAuth('button.changePassword')}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
