import moment, { Moment } from "jalali-moment";
import { without } from "ramda";
import { useState } from "react";
import { compareMoment, getFirstDayOfMonth } from "../utils";

export function useDatePicker(
  {
    dates,
    reservedDates,
    setDates,
    ctrlPressed,
  }: {
    dates: Moment[];
    reservedDates: Moment[];
    setDates: (n: Moment[]) => void;
    ctrlPressed: boolean;
  },
) {
  const [currentMonth, setCurrentMonth] = useState(getFirstDayOfMonth());
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const datesInCurrentMonth = dates.filter(
    (d) => d.jMonth() === currentMonth.jMonth(),
  );

  const highlightedDays: number[] = datesInCurrentMonth.map((d) => d.jDate()); // TODO: use Set to be unique

  let selectedTimes: number[] = [];

  if (selectedDays.length > 0) {
    const sDay = selectedDays[0];
    selectedTimes = datesInCurrentMonth
      .filter((d) => d.jDate() === sDay)
      .map((d) => d.hour());
  }

  function toggleDay(day: number) {
    if (ctrlPressed) {
      if (selectedDays.includes(day)) {
        setSelectedDays(without([day], selectedDays));
        return;
      }
      setSelectedDays([...selectedDays, day]);
      return;
    }

    setSelectedDays([day]);
  }

  function toggleTime(time: number) {
    const now = moment();
    if (selectedDays.length === 0) return;

    let newDates = [...dates];
    for (const selectedDay of selectedDays) {
      const date = currentMonth.clone().jDate(selectedDay).hour(time);

      if (!includes(dates, date)) {
        if (date.isBefore(now)) continue;
        newDates.push(date);
      } else {
        newDates = withoutDate(newDates, date);
      }
    }
    setDates(newDates);
  }

  function changeMonth(d: -1 | 1) {
    setSelectedDays([]);
    setCurrentMonth(currentMonth.clone().add(d, "months"));
  }

  const disabledDays: number[] = [];
  let now = moment();
  for (let i = 0; i < 31; i++) {
    if (currentMonth.clone().add(i + 1, "days").isBefore(now)) {
      disabledDays.push(i + 1);
    }
  }

  const outlinedDays: number[] = [];
  if (now.jMonth() === currentMonth.jMonth()) {
    outlinedDays.push(now.jDate());
  }

  return {
    currentMonth,
    currentMonthTitle: currentMonth.locale("fa").format("MMMM"),
    highlightedDays,
    selectedDays,
    selectedTimes,
    startWeekday: currentMonth.jMonth(),
    daysInMonth: currentMonth.jDaysInMonth(),
    outlinedDays,
    disabledDays,
    setCurrentMonth,
    toggleDay,
    toggleTime,
    changeMonth,
  };
}

function includes(dates: Moment[], date: Moment): boolean {
  for (const d of dates) {
    if (compareMoment(d, date)) return true;
  }

  return false;
}

function withoutDate(dates: Moment[], date: Moment): Moment[] {
  const newDates: Moment[] = [];
  for (const d of dates) {
    if (!compareMoment(d, date)) newDates.push(d);
  }

  return newDates;
}
