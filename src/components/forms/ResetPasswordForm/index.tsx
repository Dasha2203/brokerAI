import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormValues, Props } from './types';
import useForm from '@/hooks/useForm';
import FormField from '../FormField';
import Input from '../Input';
import Button from '@/components/buttons/Button';
import { useErrorBoundary } from 'react-error-boundary';
import Lottie from 'lottie-react';
import emailSuccess from "@/animations/email-success.json";
import { resetPassword } from '@/api/auth';

const ResetPasswordForm = ({ email, onCancel }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const { getFieldProps, getFieldMeta, handleSubmit, isSubmitting } =
    useForm<FormValues>({
      initialValues: {
        email: email || '',
      },
      validationSchema: Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
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
          showBoundary({ message: 'Не удалось отправить код' });
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
          Check your email
        </div>
        <p className="mt-2 text-base md:text-xl">
          We sended code to your email
        </p>
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
      <FormField label="Email" {...getFieldMeta('email')}>
        <Input
          error={getFieldMeta('email').error}
          className={'w-full'}
          placeholder={'Email'}
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
          Cancel
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
          Send code
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
