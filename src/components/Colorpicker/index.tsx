import React, { useEffect, useId, useState } from 'react';
import { Props } from './types';
import {
  offset,
  shift,
  useClick,
  useDelayGroup,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { ColorResult, TwitterPicker } from 'react-color';

const colors = [
  '#C4C4C4', // gray
  '#464366', // dark
  '#6418C3', // primary
  '#FFAB2D', // yellow
  '#5ECFFF', // blue
  '#FF4A55', // red
  '#b80754', // red
  '#E328AF', //pink
  '#38E25D', // green
  '#F6EEFF', // primary soft
  '#FFEBCC', // yellow soft
  '#D8FFE0', // green soft,
  '#DFEDF2', // blue soft
  '#FFCFF2', // pink soft
];
const defaultColor = colors[0];

const Colorpicker = ({
  className,
  style,
  containerRef,
  onChangeColor,
  color,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const { context, refs, strategy, x, y } = useFloating({
    strategy: 'absolute',
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset({ mainAxis: 16 }), shift({ padding: 20 })],
  });

  useDelayGroup(context, { id });

  useEffect(() => {
    if (!color) {
      onChangeColor(defaultColor);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    refs.setPositionReference(containerRef.current);
  }, [containerRef.current]);

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  function handleChange(value: ColorResult) {
    onChangeColor(value.hex);
  }

  return (
    <div className={className} style={style}>
      <div
        aria-label="Change color"
        className="rounded-lg cursor-pointer transition-colors h-8 w-12"
        style={{
          backgroundColor: color,
        }}
        ref={refs.setReference}
        {...getReferenceProps()}
      />
      {isOpen && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 10,
          }}
        >
          <TwitterPicker
            onChange={handleChange}
            color={color || defaultColor}
            colors={colors}
          />
        </div>
      )}
    </div>
  );
};

export default Colorpicker;
