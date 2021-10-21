import moment from "jalali-moment";

export function getFirstDayOfMonth(month, year) {
  const date = moment();
  date.month(month);
  if (year) date.year(year);

  date.date(0);
  return date;
}
