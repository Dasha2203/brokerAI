import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import React, { useRef, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { FormValues } from './types';
import useForm from '@/hooks/useForm';
import FormField from '@/components/forms/FormField';
import Input from '@/components/forms/Input';
import Colorpicker from '@/components/Colorpicker';
import Button from '@/components/buttons/Button';
import { useAppDispatch } from '@/hooks/redux';
import {
  createStockPack,
  updateStockPack,
} from '@/store/reducers/UserSlice/actionCreators';
import { Props } from './types';

const CreateStockPackForm = ({ data, onSubmit }: Props) => {
  const t = useTranslations('stockpacks');
  const tError = useTranslations('auth.error');
  const tCommonError = useTranslations('error');
  const dispatch = useAppDispatch();
  const { showBoundary } = useErrorBoundary();
  const [color, setColor] = useState(data?.color || '');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    getFieldMeta,
    getFieldProps,
    handleSubmit,
    isSubmitting,
    setFieldError,
  } = useForm<FormValues>({
    initialValues: {
      name: data?.stockPackName || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(tError('required')),
    }),
    onSubmit: async (values) => {
      const { name } = values;

      if (!name.trim()) {
        setFieldError('name', tError('required'));
        return;
      }

      try {
        if (data?.stockPackId) {
          await dispatch(
            updateStockPack({
              stockPackId: data.stockPackId,
              color,
              stockPackName: name,
            }),
          );
          onSubmit();
          return;
        }
        await dispatch(
          createStockPack({
            color,
            stockPackName: name,
          }),
        );
        onSubmit();
      } catch (err) {
        console.log(err);
        showBoundary({ message: tCommonError('wrong') });
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-1 gap-7 overflow-hidden"
    >
      <FormField label={t('input.name.label')} {...getFieldMeta('name')}>
        <Input
          error={getFieldMeta('name').error}
          className={'w-full'}
          placeholder={t('input.name.placeholder')}
          {...getFieldProps('name')}
        />
      </FormField>
      <FormField label={t('input.color.label')}>
        <Colorpicker
          color={color}
          onChangeColor={setColor}
          containerRef={containerRef}
        />
      </FormField>
      <div className="mt-auto md:mt-12 flex flex-col md:flex-row gap-4 md:gap-8">
        <Button
          as="button"
          variant="outlined"
          uiColor="primary"
          className="flex-1"
          fixedSize
        >
          {t('button.cancel')}
        </Button>
        <Button
          as="button"
          type="submit"
          variant="contained"
          uiColor="primary"
          className="flex-1"
          fixedSize
          isLoading={isSubmitting}
        >
          {data ? t('button.edit') : t('button.create')}
        </Button>
      </div>
    </form>
  );
};

export default CreateStockPackForm;
