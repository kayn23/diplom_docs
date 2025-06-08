import { ChangeEvent, memo, useEffect, useRef, type FC, type InputHTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

type InputTheme = 'default' | 'outline';

export interface InputProps extends HtmlInputProps {
  className?: string;
  value: string;
  onChange?: (value: string) => void;
  theme?: InputTheme;
  autofocus?: boolean;
}

export const Input: FC<InputProps> = memo((props) => {
  const { className, value, onChange, type, autofocus = false, theme = 'default', ...otherProps } = props;
  const ref = useRef<HTMLInputElement>(null);

  const onChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  return (
    <input
      className={classNames(cls.Input, { additional: [className, cls[theme]] })}
      type={type}
      value={value}
      onChange={onChangeEvent}
      ref={ref}
      {...otherProps}
    />
  );
});
