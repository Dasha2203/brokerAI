import { forwardRef } from 'react';
import CloseIcon from '@/icons/CloseIcon';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from '@floating-ui/react';
import clsx from 'clsx';
import { ModalProps } from './types';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ header, children, context, ...props }, ref) => {
    return (
      <FloatingPortal>
        <FloatingOverlay
          lockScroll
          className={clsx(
            'bg-black/15',
            'dark:bg-black/50 z-50 flex justify-center items-center',
          )}
        >
          <FloatingFocusManager context={context}>
            <div
              {...props}
              className={clsx(
                'bg-white',
                'dark:bg-violet-500',
                'relative',
                'px-4 py-5 xs:px-5 xs:py-6 md:px-[50px] md:pt-[40px] md:pb-[55px]',
                'flex flex-col',
                'h-full w-full md:w-auto md:h-auto md:min-w-[552px]',
                'md:rounded-2xl w-fit',
              )}
              ref={ref}
            >
              <button
                className={clsx(
                  'absolute right-2 top-3.5 md:right-4 md:top-[52px]',
                  'flex justify-center items-center w-11 h-11 text-gray-300 hover:text-gray-500 dark:text-white transition-colors',
                )}
                onClick={() => context.onOpenChange(false)}
                aria-label="Close modal"
              >
                <CloseIcon className="w-4.5 h-4.5" />
              </button>
              {header && (
                <div className="mr-8 text-black dark:text-white font-bold text-2xl md:text-3.5xl truncate">
                  {header}
                </div>
              )}
              <div className="pt-8 flex flex-col flex-1">{children}</div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  },
);

Modal.displayName = 'Modal';
export default Modal;
