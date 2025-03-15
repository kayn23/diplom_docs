import { useState, type FC, type ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AccountLayout.module.scss';
import { IconButton, Stack } from '@mui/joy';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface AccountLayoutProps {
  className?: string;
  children?: ReactNode;
  sidebar?: ReactNode;
}

export const AccountLayout: FC<AccountLayoutProps> = (props) => {
  const { className, children, sidebar } = props;
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const showSidebar = () => {
    setIsShowSidebar(true);
  };
  const hideSidebar = () => {
    setIsShowSidebar(false);
  };

  return (
    <Stack
      className={classNames(cls.AccountLayout, { additional: [className] })}
      direction="row"
    >
      {sidebar && (
        <Stack
          direction="row"
          sx={{ borderRadius: '8px' }}
          className={classNames(cls.sidebar, { mods: { [cls.showSidebar]: isShowSidebar } })}
        >
          {isShowSidebar && <Stack sx={{ flexGrow: 1 }}>{sidebar}</Stack>}
          {isShowSidebar ? (
            <IconButton onClick={hideSidebar}>
              <ChevronLeft></ChevronLeft>
            </IconButton>
          ) : (
            <IconButton onClick={showSidebar}>
              <ChevronRight></ChevronRight>
            </IconButton>
          )}
        </Stack>
      )}{' '}
      <Stack className={classNames(cls.content)}>{children}</Stack>
    </Stack>
  );
};
