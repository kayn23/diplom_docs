import { useState, type FC, type ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AccountLayout.module.scss';
import { IconButton, Stack } from '@mui/joy';
import { ChevronLeft, ChevronRight, ExpandLess, ExpandMore } from '@mui/icons-material';
import { SidebarMenu } from 'widgets/SidebarMenu';
import { useMobile } from 'shared/lib/useMobile/useMobile';

interface AccountLayoutProps {
  className?: string;
  children?: ReactNode;
  sidebar?: ReactNode;
}

export const AccountLayout: FC<AccountLayoutProps> = (props) => {
  const { className, children, sidebar = <SidebarMenu /> } = props;
  const isMobile = useMobile();
  const [isShowSidebar, setIsShowSidebar] = useState(!isMobile);
  const showSidebar = () => {
    setIsShowSidebar(true);
  };
  const hideSidebar = () => {
    setIsShowSidebar(false);
  };

  return (
    <Stack
      className={classNames(cls.AccountLayout, { additional: [className] })}
      direction={{ xs: 'column', sm: 'row' }}
    >
      {sidebar && (
        <Stack
          direction={{ sm: 'row' }}
          sx={{
            borderRadius: '8px',
            position: { xs: isShowSidebar ? 'absolute' : 'relative', sm: 'relative' },
            maxWidth: { xs: '100%', sm: '20%' },
            zIndex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: { xs: isShowSidebar ? 0 : undefined },
          }}
          className={classNames(cls.sidebar, { mods: { [cls.showSidebar]: isShowSidebar } })}
        >
          {isMobile && (
            <>
              {isShowSidebar ? (
                <IconButton onClick={hideSidebar}>
                  <ExpandLess></ExpandLess>
                </IconButton>
              ) : (
                <IconButton onClick={showSidebar}>
                  <ExpandMore></ExpandMore>
                </IconButton>
              )}
            </>
          )}
          {isShowSidebar && <Stack sx={{ flexGrow: 1 }}>{sidebar}</Stack>}
          {!isMobile &&
            (isShowSidebar ? (
              <IconButton onClick={hideSidebar}>
                <ChevronLeft></ChevronLeft>
              </IconButton>
            ) : (
              <IconButton onClick={showSidebar}>
                <ChevronRight></ChevronRight>
              </IconButton>
            ))}
        </Stack>
      )}{' '}
      <Stack className={classNames(cls.content)}>{children}</Stack>
    </Stack>
  );
};
