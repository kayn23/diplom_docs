import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/ui/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useTranslation } from 'react-i18next';

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  const { t } = useTranslation();
  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button
        onClick={increment}
        data-testid="increment-button"
      >
        {t('entities.counter.increment')}
      </Button>
      <Button
        onClick={decrement}
        data-testid="decrement-button"
      >
        {t('entities.counter.decrement')}
      </Button>
    </div>
  );
};
