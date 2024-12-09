'use client';
import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import CustomInput from './CustomInput';
import { Props } from './types';

interface CustomDateInputProps extends React.HTMLProps<HTMLButtonElement> {
  value?: string;
}

const CustomDateRangePicker = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}: Props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
    ({ value, onClick, className }, ref) => (
      <CustomInput
        placeholder={value || 'Select Date Range'}
        onClick={onClick}
        ref={ref as React.Ref<HTMLDivElement>}
        className={className}
      />
    ),
  );

  useEffect(() => {
    if (dateRange[0]) {
      setStartDate(dateRange[0]);
    } else {
      setStartDate(undefined);
    }

    if (dateRange[1]) {
      setEndDate(dateRange[1]);
    } else {
      setEndDate(undefined);
    }
  }, [dateRange]);

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      calendarStartDay={1}
      customInput={<CustomDateInput className="text-sm w-full" />}
      className="w-full"
    />
  );
};

export default CustomDateRangePicker;
