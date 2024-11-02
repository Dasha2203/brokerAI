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

const ChangePasswordForm = () => {
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
        .min(6, 'Minimal 6 symbols')
        .nullable()
        .required('field is empty'),
      repeatPassword: Yup.string()
        .min(6, 'Minimal 6 symbols')
        .nullable()
        .required('field is empty'),
    }),
    onSubmit: async (values) => {
      const { password, repeatPassword } = values;

      if (!password || !repeatPassword || !code) {
        return;
      }

      if (password !== repeatPassword) {
        setFieldError('repeatPassword', 'Пароли должны совпадать');
        return;
      }

      try {
        await changePassword({
          password,
          code,
        });
        setIsSuccess(true);
      } catch (err) {
        showBoundary('Smth went wrong!');
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
        label: 'Password',
        field: 'password',
        component: PasswordInput,
      },
      {
        label: 'Repeat password',
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
            Sign in
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
          label={label}
          rightNode={rightNode}
          key={idx}
          {...getFieldMeta(field)}
        >
          <Field
            className={'w-full'}
            placeholder={label}
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
        Change password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
