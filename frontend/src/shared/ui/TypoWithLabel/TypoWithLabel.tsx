import type { FC, ReactNode } from 'react';
import { Typography } from '@mui/joy';

interface TypoWithLabelProps {
  label: ReactNode;
  children: ReactNode;
}

export const TypoWithLabel: FC<TypoWithLabelProps> = (props) => {
  const { label, children } = props;

  return (
    <Typography>
      <Typography>{label}: </Typography>
      <Typography level="title-md">{children}</Typography>
    </Typography>
  );
};
