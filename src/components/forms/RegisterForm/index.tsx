'use client';
import React, { useState } from 'react';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import * as Yup from 'yup';
import FormField from '../FormField';
import PasswordInput from '../PasswordInput';
import useForm from '@/hooks/useForm';
import { FormValues } from './types';
import { register } from '@/api/auth';
import Link from '@/components/Link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const formFields: {
  label: string;
  field: keyof FormValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}[] = [
  {
    label: 'firstName',
    field: 'firstName',
    component: Input,
  },
  {
    label: 'lastName',
    field: 'lastName',
    component: Input,
  },
  {
    label: 'email',
    field: 'email',
    component: Input,
  },
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
];

const minCountPass = 6;

const RegisterForm = () => {
  const tAuth = useTranslations('auth');
  const tError = useTranslations('auth.error');
  const tCommonError = useTranslations('error');
  const [error, setError] = useState('');
  const router = useRouter();
  const { getFieldProps, getFieldMeta, handleSubmit, isSubmitting, setErrors } =
    useForm<FormValues>({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required(tError('required')),
        lastName: Yup.string().required(tError('required')),
        password: Yup.string()
          .min(minCountPass, tError('password.min', { count: minCountPass }))
          .nullable()
          .required(tError('required')),
        repeatPassword: Yup.string()
          .min(minCountPass, tError('password.min', { count: minCountPass }))
          .nullable()
          .required(tError('required')),
        email: Yup.string()
          .email(tError('email.format'))
          .required(tError('required')),
      }),
      onSubmit: async (values) => {
        setError('');
        const { firstName, lastName, email, password, repeatPassword } = values;

        if (!email || !password || !repeatPassword || !firstName || !lastName) {
          return;
        }

        if (password !== repeatPassword) {
          setErrors({ repeatPassword: tError('password.equals') });
          return;
        }

        try {
          const { data, errorCode } = await register({
            firstName,
            languageCode: 'en',
            lastName,
            password,
            email,
            countryCode: 'US',
          });

          if (errorCode || !data) {
            setError(errorCode);
            return;
          }

          const {
            accessToken,
            refreshToken,
            accessTokenExpiration,
            refreshTokenExpiration,
          } = data;

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
          router.push('/');
        } catch (err) {
          console.log(err);
          setError(tCommonError('wrong'));
        }
      },
    });

  return (
    <form
      className="flex flex-col gap-7 overflow-hidden"
      onSubmit={(e) => {
        if (isSubmitting) {
          return;
        }
        handleSubmit(e);
      }}
    >
      {formFields.map(({ field, component: Field, label }, idx) => (
        <FormField
          label={tAuth(`input.${label}.label`)}
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
        isLoading={isSubmitting}
        className="w-full"
        type="submit"
      >
        {tAuth('button.signUp')}
      </Button>
      <Link as="link" href="/auth/login" className="text-center">
        {tAuth('button.haveAccount')}
      </Link>
    </form>
  );
};

export default RegisterForm;
