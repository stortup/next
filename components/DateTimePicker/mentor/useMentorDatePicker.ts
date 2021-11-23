import moment, { Moment } from "jalali-moment";
import { without } from "ramda";
import { useState } from "react";
import { compareMoment, getFirstDayOfMonth, scope } from "../utils";

export function useDatePicker(
  {
    dates: _dates,
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
  const [month, setMonth] = useState(getFirstDayOfMonth());
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const selectedDay = selectedDays.length === 1 ? selectedDays[0] : undefined;

  const now = moment();

  const filter = {
    month,
    day: selectedDay,
  };

  const dates = scope(_dates, filter);

  const reserved = scope(reservedDates, filter);

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

    let newDates = [...dates.all];
    for (const selectedDay of selectedDays) {
      const date = month.clone().jDate(selectedDay).hour(time);

      if (!includes(dates.all, date)) {
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
    setMonth(month.clone().add(d, "months"));
  }

  return {
    month,
    monthTitle: month.locale("fa").format("MMMM"),
    highlightedDays: dates.daysInMonth,
    selectedDays,
    selectedTimes: dates.timesInDay,
    reservedTimes: reserved.timesInDay,
    startWeekday: month.jDay(),
    daysInMonth: month.jDaysInMonth(),
    outlinedDays: now.jMonth() === month.jMonth() ? [now.jDate()] : [],
    disabledDays: disabledDays(month),
    setMonth,
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

function disabledDays(month: Moment) {
  const days: number[] = [];
  let now = moment();
  for (let i = 0; i < 31; i++) {
    if (month.clone().add(i + 1, "days").isBefore(now)) {
      days.push(i + 1);
    }
  }

  return days;
}
