import useForm from '@/hooks/useForm';
import React, { useEffect, useMemo, useState } from 'react';
import { FormValues, Props } from './types';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import Input from '@/components/forms/Input';
import FormField from '@/components/forms/FormField';
import Button from '@/components/buttons/Button';
import Select from '@/components/Select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchStockPacks } from '@/store/reducers/UserSlice/actionCreators';
import { IStockPack } from '@/models/IStockPack';
import { buyTicker } from '@/api/ticker';
import { REGEX_NUMBER } from '@/const';
import clsx from 'clsx';
import { useErrorBoundary } from 'react-error-boundary';

const BuyTickerForm = ({ ticketId, className, onSubmit }: Props) => {
  const t = useTranslations('tickers');
  const tCommon = useTranslations();
  const tError = useTranslations('auth.error');
  const dispatch = useAppDispatch();
  const { showBoundary } = useErrorBoundary();
  const [stockPack, setStockPack] = useState<IStockPack | null>(null);
  const { list } = useAppSelector((state) => state.userReducer.stockpacks);
  const {
    getFieldProps,
    getFieldMeta,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useForm<FormValues>({
    initialValues: {
      count: '',
      price: '',
    },
    validationSchema: Yup.object({
      count: Yup.number().required(tError('required')),
      price: Yup.number().required(tError('required')),
    }),
    onSubmit: async (values) => {
      if (!stockPack) return;
      const { count, price } = values;

      try {
        await buyTicker({
          ticketId,
          count: +count,
          price: +price,
          stockPackId: stockPack.stockPackId,
        });
        onSubmit();
      } catch (err) {
        console.log(err);
        showBoundary({ message: tCommon('error.wrong') });
      }
    },
  });
  useEffect(() => {
    if (list.length) return;

    dispatch(
      fetchStockPacks({
        Offset: 0,
        limit: 9999,
      }),
    );
  }, []);

  const formFields: {
    label: string;
    field: keyof FormValues;
    rightNode?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
  }[] = useMemo(
    () => [
      {
        label: t('label.price'),
        field: 'price',
        component: Input,
      },
      {
        label: t('label.count'),
        field: 'count',
        component: Input,
      },
    ],
    [],
  );

  function handleChangeStockPack(value: IStockPack) {
    setStockPack(value);
  }

  const handleChangePrice = (value: string | null) => {
    if (value && REGEX_NUMBER.test(value)) {
      setFieldValue('price', value);
    }

    if (!value) {
      setFieldValue('price', '');
    }
  };

  const handleChangeCount = (value: string | null) => {
    if (value && REGEX_NUMBER.test(value)) {
      setFieldValue('count', value);
    }

    if (!value) {
      setFieldValue('count', '');
    }
  };

  return (
    <form
      className={clsx('flex flex-col gap-7', className)}
      onSubmit={(e) => {
        if (isSubmitting) {
          return;
        }
        handleSubmit(e);
      }}
    >
      <FormField label="StockPack">
        <Select
          title={t('action.selectStockpack')}
          control={
            <div>
              <Button as="button" className="w-full relative">
                {stockPack
                  ? stockPack.stockPackName
                  : t('action.selectStockpack')}
              </Button>
            </div>
          }
          options={list}
          onChange={handleChangeStockPack}
          optionAs={(value) => <div>{value.stockPackName}</div>}
          isActive={(value) => value.stockPackId === stockPack?.stockPackId}
        />
      </FormField>
      {formFields.map(({ field, component: Field, label, rightNode }, idx) => (
        <FormField
          label={label}
          rightNode={rightNode}
          key={idx}
          {...getFieldMeta(field)}
        >
          <Field
            {...getFieldProps(field)}
            onChange={field === 'price' ? handleChangePrice : handleChangeCount}
            className={'w-full'}
            placeholder={label}
          />
        </FormField>
      ))}
      <Button
        as="button"
        uiColor="primary"
        variant="contained"
        fixedSize
        className="w-full mt-auto"
        type="submit"
        isLoading={isSubmitting}
        disabled={
          !getFieldMeta('count').value ||
          !getFieldMeta('price').value ||
          !stockPack
        }
      >
        {t('action.buy')}
      </Button>
    </form>
  );
};

export default BuyTickerForm;
