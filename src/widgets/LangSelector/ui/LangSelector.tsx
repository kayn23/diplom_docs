import React, { ButtonHTMLAttributes, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/ui/Button';

interface LangSelectorProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const LangSelector: FC<LangSelectorProps> = ({ ...props }) => {
  const { i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button theme="clear" onClick={toggle} {...props}>
      {i18n.language}
    </Button>
  );
};
