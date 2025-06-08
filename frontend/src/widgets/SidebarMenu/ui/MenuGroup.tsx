import { Stack, Typography } from '@mui/joy';
import { useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { BaseLink } from 'shared/ui/BaseLink/BaseLink';
import { useSelector } from 'react-redux';
import { getUserRoles, Roles } from 'entities/User';
import { IMenuGroup } from 'shared/types/IMenuGroup';

interface MenuGroupProps {
  className?: string;
  group: IMenuGroup;
}

export const MenuGroup: FC<MenuGroupProps> = (props) => {
  const { t } = useTranslation();

  const { className, group } = props;
  const roles = useSelector(getUserRoles);

  const checkRoles = useCallback(
    (r: Roles[] | undefined) => {
      if (!r) return true;
      if (!roles) return false;
      return roles.some((role) => r.includes(role));
    },
    [roles]
  );

  return (
    <>
      {checkRoles(group.roles) && (
        <Stack
          gap="8px"
          className={classNames('MenuGroup', { additional: [className] })}
        >
          <Typography level="title-lg">{t(group.label)}</Typography>
          {group.childrens.map((item) => {
            if (checkRoles(item.roles))
              return (
                <BaseLink
                  to={item.link}
                  key={item.label}
                >
                  {t(item.label)}
                </BaseLink>
              );
          })}
        </Stack>
      )}
    </>
  );
};
