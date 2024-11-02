import DefaultError from '@/components/errors/DefaultError';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import Modal from '@/components/Modal';
import { ErrorBoundary } from 'react-error-boundary';
import { Props } from './types';

const ResetPasswordModal = ({ email, ...props }: Props) => {
  function handleClose() {
    props.context.onOpenChange(false);
  }

  return (
    <Modal header="Reset password" {...props}>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <DefaultError {...props} className="my-auto" />
        )}
      >
        <ResetPasswordForm email={email} onCancel={handleClose} />
      </ErrorBoundary>
    </Modal>
  );
};

export default ResetPasswordModal;
