import { Moment } from "jalali-moment";
import { without } from "ramda";
import { useEffect, useState } from "react";
import { getFirstDayOfMonth, scope } from "../utils";

export function useDatePicker(
  { availableDates, reservedDates, selectedDate, onDateSelected }: {
    availableDates: Moment[];
    reservedDates: Moment[];
    selectedDate: Moment | null;
    onDateSelected: (date: Moment | null) => unknown;
  },
) {
  const [month, setMonth] = useState(getFirstDayOfMonth());
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);

  useEffect(() => {
    setSelectedDay(selectedDate?.jDate());
  }, [selectedDate]);

  const filter = {
    month,
    day: selectedDay,
  };

  const available = scope(availableDates, filter);
  const reserved = scope(reservedDates, filter);
  const selected = scope(selectedDate ? [selectedDate] : [], filter);

  function toggleDay(day: number) {
    setSelectedDay(day);
  }

  function selectTime(time: number) {
    if (!selectedDay) return;

    const date = month.clone().jDate(selectedDay).hour(time);
    if (selectedDate?.isSame(date)) {
      onDateSelected(null);
      return;
    }

    onDateSelected(date);
  }

  function changeMonth(d: -1 | 1) {
    setSelectedDay(undefined);
    setMonth(month.clone().add(d, "months"));
  }

  return {
    month,
    monthTitle: month.locale("fa").format("MMMM"),
    highlightedDays: available.daysInMonth,
    startWeekday: month.jDay(),
    daysInMonth: month.jDaysInMonth(),
    availableTimes: available.timesInDay,
    reservedTimes: reserved.timesInDay,
    selectedTimes: selected.timesInDay,
    selectedDay,
    setMonth,
    toggleDay,
    selectTime,
    changeMonth,
    selectedDate,
  };
}
