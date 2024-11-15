import React from 'react';
import { Props } from './types';
import clsx from 'clsx';
import ButtonIcon from '../buttons/ButtonIcon';
import OptionsIcon from '@/icons/OptionsIcon';
import Select from '../Select';
import { removeStockPack } from '@/store/reducers/UserSlice/actionCreators';
import { useAppDispatch } from '@/hooks/redux';
import useModal from '@/hooks/useModal';
import CreateStockPackModal from '@/screens/StockPacks/components/CreateStockPackModal';

const StockPackCard = ({ data }: Props) => {
  const { active, color, stockPackName, totalCostStocks, stockPackId } = data;
  const dispatch = useAppDispatch();
  const modal = useModal();
  const options: {
    label: string;
    onClick: () => Promise<void>;
  }[] = [
    {
      label: 'Remove',
      onClick: async () => {
        await dispatch(removeStockPack({ stockPackId }));
      },
    },
    {
      label: 'Edit',
      onClick: async () => {
        modal.setIsOpen(true);
      },
    },
  ];

  function handleChange(value: {
    label: string;
    onClick: () => Promise<void>;
  }) {
    value.onClick();
  }

  return (
    <div className={clsx('bg-white', '', 'relative p-7 rounded-xl')}>
      {active && (
        <Select
          title={'title'}
          control={
            <ButtonIcon
              icon={OptionsIcon}
              aria-label={'dkkdkd'}
              className="absolute top-0 right-0"
            />
          }
          options={options}
          onChange={handleChange}
          optionAs={(value) => <div>{value.label}</div>}
        />
      )}
      <div className="flex items-center">
        <div
          className={clsx('mr-[11px] w-2.5 h-2.5 rounded-full', {
            'bg-gray-200': !active,
          })}
          style={{
            ...(active
              ? {
                  backgroundColor: color,
                }
              : {}),
          }}
        />
        <span
          className={clsx('font-semibold text-lg', {
            'text-gray-200': !active,
          })}
          style={{
            ...(active
              ? {
                  color,
                }
              : {}),
          }}
        >
          {stockPackName}
        </span>
      </div>
      <div
        className={clsx('mt-2 font-semibold text-2xl text-black', {
          'text-gray-200': !active,
        })}
      >
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 3,
        }).format(totalCostStocks)}
      </div>

      {modal.isOpen && (
        <CreateStockPackModal {...modal.modalProps} data={data} />
      )}
    </div>
  );
};

export default StockPackCard;
