import { Checkbox, Stack } from '@mui/joy';
import { useCallback, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { weekday } from 'shared/lib/weekday';

interface WeekdaySelectorProps {
  className?: string;
  selectedDays: number[];
  onChange?: (val: number[]) => void;
}

export const WeekdaySelector: FC<WeekdaySelectorProps> = (props) => {
  const { t } = useTranslation();

  const { className, selectedDays, onChange } = props;

  const onChexboxChange = useCallback(
    (day: number, checked: boolean) => {
      if (!checked) onChange?.(selectedDays.filter((d) => d !== day));
      else onChange?.([...selectedDays, day]);
    },
    [onChange, selectedDays]
  );

  const displayWeekday = useMemo(
    () =>
      weekday
        .filter((w) => !!w)
        .map((wd, index) => (
          <Checkbox
            checked={selectedDays.includes(index + 1)}
            key={wd}
            onChange={(e) => onChexboxChange(index + 1, e.target.checked)}
            label={t(`weekdays.${wd}`)}
          />
        )),
    [t, selectedDays, onChexboxChange]
  );

  return (
    <Stack
      gap="8px"
      className={classNames('WeekdaySelector', { additional: [className] })}
    >
      {displayWeekday}
    </Stack>
  );
};
