'use client';
import React from 'react';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '../FormField';
import PasswordInput from '../PasswordInput';

const validationSchema = Yup.object({
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
});

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      // countryCode: '',
      // languageCode: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
    },
    validationSchema,
    validateOnBlur: true,
  });

  console.log(formik.errors);

  return (
    <div className="mx-auto p-6 md:p-12 md:max-w-[512px] w-full bg-white dark:bg-violet-500 rounded-xl">
      <h1 className="mb-10 font-bold text-3xl md:text-4xl text-center ">
        Sign up
      </h1>
      <form className="flex flex-col gap-7" onSubmit={formik.handleSubmit}>
        <FormField label="First Name">
          <Input
            name="firstName"
            placeholder="First Name"
            className="w-full"
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName ? formik.errors.firstName : ''}
          />
        </FormField>
        <FormField label="Last Name">
          <Input
            name="lastName"
            placeholder="Last Name"
            className="w-full"
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.lastName ? formik.errors.lastName : ''}
          />
        </FormField>
        <FormField label="Email">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email ? formik.errors.email : ''}
          />
        </FormField>
        <FormField label="Password">
          <PasswordInput
            name="password"
            placeholder="Password"
            className="w-full"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password ? formik.errors.password : ''}
          />
        </FormField>
        <FormField label="Repeat password">
          <Input
            name="repeatPassword"
            placeholder="Repeat password"
            className="w-full"
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.repeatPassword ? formik.errors.repeatPassword : ''
            }
          />
        </FormField>
        <Button
          as="button"
          uiColor="primary"
          variant="contained"
          fixedSize
          className="w-full"
          type="submit"
        >
          Sign up
        </Button>
        <div className="mt-6">
          <span> Already have an account?</span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
