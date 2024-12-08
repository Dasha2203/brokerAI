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

const BuyTickerForm = ({ ticketId }: Props) => {
  const tError = useTranslations('auth.error');
  const dispatch = useAppDispatch();
  const [stockPack, setStockPack] = useState<IStockPack | null>(null);
  const { list } = useAppSelector((state) => state.userReducer.stockpacks);
  const { getFieldProps, getFieldMeta, handleSubmit, isSubmitting } =
    useForm<FormValues>({
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
          const res = await buyTicker({
            ticketId,
            count: +count,
            price: +price,
            stockPackId: stockPack.stockPackId,
          });
        } catch (err) {
          console.log(err);
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
        label: 'price',
        field: 'price',
        component: Input,
      },
      {
        label: 'count',
        field: 'count',
        component: Input,
      },
    ],
    [],
  );

  function handleChangeStockPack(value: IStockPack) {
    setStockPack(value);
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
            type="number"
            {...getFieldProps(field)}
          />
        </FormField>
      ))}
      <FormField label="StockPack">
        <Select
          title={'title'}
          control={
            <div>
              {stockPack ? stockPack.stockPackName : 'Select stockPack'}
            </div>
          }
          options={list}
          onChange={handleChangeStockPack}
          optionAs={(value) => <div>{value.stockPackName}</div>}
          isActive={(value) => value.stockPackId === stockPack?.stockPackId}
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
        Buy
      </Button>
    </form>
  );
};

export default BuyTickerForm;
