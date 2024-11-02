'use client';
import React from 'react';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import * as Yup from 'yup';
import FormField from '../FormField';
import PasswordInput from '../PasswordInput';
import useForm from '@/hooks/useForm';
import { FormValues } from './types';
import { register } from '@/api/auth';
import Link from '@/components/Link';

const formFields: {
  label: string;
  field: keyof FormValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}[] = [
  {
    label: 'First name',
    field: 'firstName',
    component: Input,
  },
  {
    label: 'Last name',
    field: 'lastName',
    component: Input,
  },
  {
    label: 'Email',
    field: 'email',
    component: Input,
  },
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
];

const RegisterForm = () => {
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
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        password: Yup.string()
          .min(6, 'Minimal 6 symbols')
          .nullable()
          .required('field is empty'),
        repeatPassword: Yup.string()
          .min(6, 'Minimal 6 symbols')
          .nullable()
          .required('field is empty'),
        email: Yup.string().email('Invalid email format').required('Required'),
      }),
      onSubmit: async (values) => {
        const { firstName, lastName, email, password, repeatPassword } = values;
        if (!email || !password || !repeatPassword || !firstName || !lastName) {
          return;
        }
        if (password !== repeatPassword) {
          setErrors({ repeatPassword: 'Пароли должны совпадать' });
          return;
        }

        await register({
          firstName,
          languageCode: 'en',
          lastName,
          password,
          email,
          countryCode: 'US',
        });
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
        <FormField label={label} key={idx} {...getFieldMeta(field)}>
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
        isLoading={isSubmitting}
        className="w-full"
        type="submit"
      >
        {isSubmitting ? 'Loading...' : 'Sign up'}
      </Button>
      <Link as="link" href="/auth/login" className="text-center">
        You don't have an account ?
      </Link>
    </form>
  );
};

export default RegisterForm;
