import { useHightRole } from 'entities/User';
import { useCourier } from 'entities/User/lib/useCourier';
import { memo, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteOrders, getRouteShippings } from 'shared/const/router';
import { classNames } from 'shared/lib/classNames/classNames';
import { BaseLink } from 'shared/ui/BaseLink/BaseLink';

interface GeneralPageLinkProps {
  className?: string;
}

export const GeneralPageLink: FC<GeneralPageLinkProps> = memo((props) => {
  const { t } = useTranslation();

  const { className } = props;

  const hightRole = useHightRole();
  const isCourier = useCourier();

  const link = useMemo(() => {
    if (hightRole) {
      return getRouteOrders();
    }
    if (isCourier) {
      return getRouteShippings();
    }
    return getRouteOrders();
  }, [hightRole, isCourier]);

  return (
    <BaseLink
      className={classNames('GeneralPageLink', { additional: [className] })}
      to={link}
    >
      {t('navbar.home')}
    </BaseLink>
  );
});
