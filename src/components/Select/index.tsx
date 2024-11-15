'use client';
import React, { useRef, useState } from 'react';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  arrow,
  FloatingArrow,
  offset,
} from '@floating-ui/react';
import Item from './Item';

import useDeviceType from '@/hooks/useDeviceType';
import Modal from '../Modal';
import { Props } from './types';

const Select = <A,>({
  title,
  control,
  options,
  onChange,
  optionAs,
  isActive,
}: Props<A>) => {
  const [open, setOpen] = useState(false);
  const { isDeviceType: isMobile } = useDeviceType({ width: 780 });
  const arrowRef = useRef(null);
  const { context, refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(18),
      arrow({
        element: arrowRef,
      }),
    ],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div>
      {React.cloneElement(control, {
        // onClick: handleClick,
        ref: refs.setReference,
        ...getReferenceProps(),
      })}

      {open && !isMobile && (
        <FloatingPortal>
          <FloatingOverlay className="z-50">
            <FloatingFocusManager context={context}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="bg-white dark:bg-violet-500 drop-shadow-[0_1px_28px_rgba(0,0,0,0.25)] rounded-xl"
              >
                <FloatingArrow
                  context={context}
                  ref={arrowRef}
                  className="w-5 h-5 fill-white dark:fill-violet-500"
                />
                <ul>
                  {options.map((item, idx) => (
                    <Item
                      key={idx}
                      onClick={() => onChange(item)}
                      active={isActive ? isActive(item) : false}
                      value={''}
                    >
                      {optionAs(item)}
                    </Item>
                  ))}
                </ul>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}

      {open && isMobile && (
        <Modal
          header={title}
          context={context}
          ref={refs.setFloating}
          {...getFloatingProps()}
        >
          <ul>
            {options.map((item, idx) => (
              <Item
                key={idx}
                onClick={() => onChange(item)}
                active={isActive ? isActive(item) : false}
                value={''}
              >
                {optionAs(item)}
              </Item>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Select;
