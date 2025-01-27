import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{t('pages.mainPage')}</div>
      <p>{t('test')}</p>
    </div>
  );
};

export default MainPage;
