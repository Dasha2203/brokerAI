import { useId } from 'react';
import { useFormik, FormikConfig, FormikValues } from 'formik';

const useForm = <Values extends FormikValues = FormikValues>(
  props: FormikConfig<Values>,
) => {
  const { getFieldProps, getFieldMeta, setFieldValue, submitCount, ...rest } =
    useFormik({
      ...props,
      validateOnBlur: false,
    });

  const id = useId();
  const getUid = (name: string) => `form-${id}-${name}`;

  return {
    setFieldValue: <K extends keyof Values>(
      name: K,
      value: Values[K],
      shouldValidate?: boolean,
    ) => setFieldValue(name as string, value, shouldValidate),
    getFieldProps: <K extends keyof Values>(name: K) => ({
      ...getFieldProps(name as string),
      isInvalid: Boolean(submitCount > 0 && getFieldMeta(name as string).error),
      onChange: (value: Values[K] | null) =>
        setFieldValue(name as string, value),
      id: getUid(name as string),
    }),
    getFieldMeta: <K extends keyof Values>(name: K) => ({
      ...getFieldMeta(name as string),
      htmlFor: getUid(name as string),
      error: submitCount > 0 ? getFieldMeta(name as string).error : undefined,
    }),
    submitCount,
    ...rest,
  };
};

export default useForm;
