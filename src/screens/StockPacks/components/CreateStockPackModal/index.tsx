'use client';
import DefaultError from '@/components/errors/DefaultError';
import Modal from '@/components/Modal';
import { ErrorBoundary } from 'react-error-boundary';
import CreateStockPackForm from './CreateStockPackForm';
import { Props } from './types';

const CreateStockPackModal = ({ data, ...props }: Props) => {
  return (
    <Modal
      header={data ? 'Edit ' + data?.stockPackName : 'Create Invest Portfolio'}
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
