'use client';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslations } from 'use-intl';
import DefaultError from '@/components/errors/DefaultError';
import Modal from '@/components/Modal';
import CreateStockPackForm from './CreateStockPackForm';
import { Props } from './types';

const CreateStockPackModal = ({ data, ...props }: Props) => {
  const t = useTranslations('stockpacks');

  return (
    <Modal
      header={data ? t('edit', { name: data.stockPackName }) : t('create')}
      {...props}
    >
      <ErrorBoundary
        FallbackComponent={(props) => (
          <DefaultError {...props} className="my-auto" />
        )}
      >
        <CreateStockPackForm
          onSubmit={() => props.context.onOpenChange(false)}
          data={data}
        />
      </ErrorBoundary>
    </Modal>
  );
};

export default CreateStockPackModal;
