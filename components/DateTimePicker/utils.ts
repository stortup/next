import moment, { Moment } from "jalali-moment";

export function getFirstDayOfMonth(month?: number, year?: number) {
  const date = moment();
  if (month) date.month(month);
  if (year) date.year(year);

  date.jDate(1);
  date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  return date;
}

export function compareMoment(a: Moment, b: Moment) {
  if (a.jYear() !== b.jYear()) return false;
  if (a.jMonth() !== b.jMonth()) return false;
  if (a.jDate() !== b.jDate()) return false;
  if (a.hour() !== b.hour()) return false;
  return true;
}

export function compareDates(a: Date, b: Date) {
  if (a.getFullYear() !== b.getFullYear()) return false;
  if (a.getMonth() !== b.getMonth()) return false;
  if (a.getDate() !== b.getDate()) return false;
  if (a.getHours() !== b.getHours()) return false;
  return true;
}

function filterByMonth(dates: Moment[], month: Moment) {
  return dates.filter(
    (d) => d.jYear() === month.jYear() && d.jMonth() === month.jMonth(),
  );
}

function filterByDay(dates: Moment[], day: number) {
  return dates.filter(
    (d) => d.jDate() === day,
  );
}

function daysOf(dates: Moment[]) {
  return dates.map((d) => d.jDate());
}

function hoursOf(dates: Moment[]) {
  return dates.map((d) => d.hour());
}

export function scope(
  dates: Moment[],
  { month, day }: { month: Moment; day?: number },
) {
  const datesInMonth = filterByMonth(dates, month);
  const datesInDay = filterByDay(datesInMonth, day ?? -1);

  return {
    all: dates,
    datesInMonth,
    datesInDay,
    daysInMonth: daysOf(datesInMonth),
    timesInDay: hoursOf(datesInDay),
  };
}
