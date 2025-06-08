import { useGeneralLink } from 'entities/User';
import { memo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { BaseLink } from 'shared/ui/BaseLink/BaseLink';

interface GeneralPageLinkProps {
  className?: string;
}

export const GeneralPageLink: FC<GeneralPageLinkProps> = memo((props) => {
  const { t } = useTranslation();

  const { className } = props;

  const { link } = useGeneralLink();

  return (
    <BaseLink
      className={classNames('GeneralPageLink', { additional: [className] })}
      to={link}
    >
      {t('navbar.home')}
    </BaseLink>
  );
});
