export const weekday = [null, 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const getWeekdayName = (index: number) => {
  if (index === 0 || index > 7) throw new Error('out_index');
  return weekday[index] as string;
};
