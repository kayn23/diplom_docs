import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

const MainPage: FC = () => {
  const { t } = useTranslation('mainpage');

  return (
    <div className={classNames(cls.MainPage)}>
      <div>{t('pages.mainPage')}</div>
      <p>{t('test')}</p>
    </div>
  );
};

export default MainPage;
