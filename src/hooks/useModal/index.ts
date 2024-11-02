import { useState } from 'react';
import {
  useFloating,
  Strategy,
  Placement,
  ReferenceType,
  useInteractions,
  useDismiss,
  useClick,
  useRole,
} from '@floating-ui/react';

type Options = {
  placement?: Placement;
  strategy?: Strategy;
  flipEnabled?: boolean;
  shiftEnabled?: boolean;
  applyReferenceWidth?: boolean;
  minWidth?: number;
};

const useModal = <R extends ReferenceType = ReferenceType>({
  strategy,
}: Options = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, context } = useFloating<R>({
    strategy: 'absolute',
    transform: false,
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'click' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);

  return {
    isOpen,
    setIsOpen,
    context,
    refs,
    getReferenceProps,
    getFloatingProps,
    modalReferenceProps: {
      ...getReferenceProps(),
      ref: refs.setReference,
    },
    modalProps: {
      context,
      ...getFloatingProps(),
      ref: refs.setFloating,
    },
  };
};

export default useModal;
