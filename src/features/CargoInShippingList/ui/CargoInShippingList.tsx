import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CargoInShippingList.module.scss';

interface CargoInShippingListProps {
  className?: string;
}

export const CargoInShippingList: FC<CargoInShippingListProps> = (props) => {
  const { t } = useTranslation();

  const { className } = props;

  return <div className={classNames(cls.CargoInShippingList, { additional: [className] })}></div>;
};
