import { Stack, Typography, Divider } from '@mui/joy';
import { menu } from 'pages/OrdersPage/model/menu';
import { MenuGroup } from './MenuGroup';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

interface SidebarMenuProps {
  className?: string;
  searchNode?: ReactNode;
  filterNode?: ReactNode;
}

export const SidebarMenu: FC<SidebarMenuProps> = (props) => {
  const { t } = useTranslation();

  const { className, searchNode, filterNode } = props;

  return (
    <Stack
      className={classNames('SidebarMenu', { additional: [className] })}
      gap="8px"
    >
      {!!searchNode && (
        <>
          <Typography level="h3">{t('SidebarMenu.sidebar.search.title')}</Typography>
          <Divider />
        </>
      )}
      {!!filterNode && (
        <>
          <Typography level="h3">{t('SidebarMenu.sidebar.filters.title')}</Typography>
          <Divider />
        </>
      )}
      {menu.map((g) => (
        <MenuGroup
          group={g}
          key={g.label}
        />
      ))}
    </Stack>
  );
};
