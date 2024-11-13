'use client';
import DefaultError from '@/components/errors/DefaultError';
import Modal from '@/components/Modal';
import { ErrorBoundary } from 'react-error-boundary';
import CreateStockPackForm from './CreateStockPackForm';
import { Props } from './types';

const CreateStockPackModal = ({ ...props }: Props) => {
  return (
    <Modal header={'Create Invest Portfolio'} {...props}>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <DefaultError {...props} className="my-auto" />
        )}
      >
        <CreateStockPackForm />
      </ErrorBoundary>
    </Modal>
  );
};

export default CreateStockPackModal;
