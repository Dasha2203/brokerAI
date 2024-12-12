import useModal from '@/hooks/useModal';

export type ModalProps = ReturnType<typeof useModal>['modalProps'] & {
  header?: React.ReactNode;
  children: React.ReactNode;
  width?: number | string;
  className?: string;
};
