'use client';
import React, { useMemo, useState } from 'react';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import * as Yup from 'yup';
import FormField from '../FormField';
import PasswordInput from '../PasswordInput';
import useForm from '@/hooks/useForm';
import { FormValues } from './types';
import useModal from '@/hooks/useModal';
import RequestResetPasswrodModal from '@/screens/auth/components/RequestResetPasswrodModal';
import Link from '@/components/Link';
import { login } from '@/api/auth';
import { useTranslations } from 'next-intl';

const minCountPass = 6;

const LoginForm = () => {
  const tError = useTranslations('auth.error');
  const tCommonError = useTranslations('error');
  const [error, setError] = useState('');
  const tAuth = useTranslations('auth');
  const { getFieldProps, getFieldMeta, handleSubmit, isSubmitting } =
    useForm<FormValues>({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .min(minCountPass, tError('password.min', { count: minCountPass }))
          .nullable()
          .required(tError('required')),
        email: Yup.string()
          .email(tError('email.format'))
          .required(tError('required')),
      }),
      onSubmit: async (values) => {
        setError('');
        const { email, password } = values;

        if (!email || !password) {
          return;
        }

        try {
          const res = await login({ email, password });
          if (res.errorCode) {
            setError(res.errorCode);
            return;
          }

          if (res.data) {
            const {
              accessToken,
              refreshToken,
              accessTokenExpiration,
              refreshTokenExpiration,
            } = res.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem(
              'accessTokenExpiration',
              accessTokenExpiration.toString(),
            );
            localStorage.setItem(
              'refreshTokenExpiration',
              refreshTokenExpiration.toString(),
            );
          }
        } catch (err) {
          console.log(err);
          setError(tCommonError('wrong'));
        }
      },
    });
  const restoreModal = useModal();

  const formFields: {
    label: string;
    field: keyof FormValues;
    rightNode?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
  }[] = useMemo(
    () => [
      {
        label: 'email',
        field: 'email',
        component: Input,
      },
      {
        label: 'password',
        field: 'password',
        rightNode: (
          <Link as="button" onClick={() => restoreModal.setIsOpen(true)}>
            {tAuth('button.forgotPassword')}
          </Link>
        ),
        component: PasswordInput,
      },
    ],
    [restoreModal],
  );

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

      {error && <span className="text-red">{error}</span>}

      <Button
        as="button"
        uiColor="primary"
        variant="contained"
        fixedSize
        className="w-full"
        type="submit"
      >
        {tAuth('button.signIn')}
      </Button>
      <Link as="link" href="/auth/register" className="text-center">
        {tAuth('button.dontHaveAccount')}
      </Link>

      {restoreModal.isOpen && (
        <RequestResetPasswrodModal {...restoreModal.modalProps} />
      )}
    </form>
  );
};

export default LoginForm;
