import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export const NumericFormatAdapter = React.forwardRef<HTMLInputElement, NumericFormatProps>(
  function NumericFormatAdapter(props, ref) {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        onValueChange={(values) => {
          props.onChange?.({
            target: {
              name: props.name,
              value: values.value,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any);
        }}
      />
    );
  }
);
