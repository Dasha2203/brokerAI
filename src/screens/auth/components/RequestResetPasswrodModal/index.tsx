import DefaultError from '@/components/errors/DefaultError';
import RequestResetPasswordForm from '@/components/forms/RequestResetPasswordForm';
import Modal from '@/components/Modal';
import { ErrorBoundary } from 'react-error-boundary';
import { Props } from './types';
import { useTranslations } from 'next-intl';

const RequestResetPasswordModal = ({ email, ...props }: Props) => {
  const tAuth = useTranslations('auth');

  function handleClose() {
    props.context.onOpenChange(false);
  }

  return (
    <Modal header={tAuth('resetPassword')} {...props}>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <DefaultError {...props} className="my-auto" />
        )}
      >
        <RequestResetPasswordForm email={email} onCancel={handleClose} />
      </ErrorBoundary>
    </Modal>
  );
};

export default RequestResetPasswordModal;
