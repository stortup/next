import { Moment } from "jalali-moment";
import { without } from "ramda";
import { useState } from "react";
import { getFirstDayOfMonth } from "../utils";

export function useDatePicker(
  { availableDates, reservedDates, onDate }: {
    availableDates: Moment[];
    reservedDates: Moment[];
    onDate: (date: Moment | null) => unknown;
  },
) {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [currentMonth, setCurrentMonth] = useState(getFirstDayOfMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const availableDatesInCurrentMonth = filterByMonth(
    availableDates,
    currentMonth.jMonth(),
  );

  const reservedDatesInCurrentMonth = filterByMonth(
    reservedDates,
    currentMonth.jMonth(),
  );

  const availableDatesInCurrentDay = filterByDay(
    availableDatesInCurrentMonth,
    selectedDay || -1,
  );

  const reservedDatesInCurrentDay = filterByDay(
    reservedDatesInCurrentMonth,
    selectedDay || -1,
  );

  const highlightedDays: number[] = availableDatesInCurrentMonth.map((v) =>
    v.jDate()
  );

  const disabledDays: number[] = without(highlightedDays, allDaysInMonth());
  const availableTimesInCurrentDay = availableDatesInCurrentDay.map((d) =>
    d.hour()
  );

  function toggleDay(day: number) {
    setSelectedDay(day);
  }

  function selectTime(time: number) {
    if (!selectedDay) return;

    const date = currentMonth.clone().jDate(selectedDay).hour(time);
    if (selectedDate?.isSame(date)) {
      setSelectedDate(null);
      onDate(null);
      return;
    }

    setSelectedDate(date);
    onDate(date);
  }

  function changeMonth(d: -1 | 1) {
    setSelectedDay(null);
    setCurrentMonth(currentMonth.clone().add(d, "months"));
  }

  return {
    currentMonth,
    currentMonthTitle: currentMonth.locale("fa").format("MMMM"),
    highlightedDays,
    disabledDays,
    startWeekday: currentMonth.jMonth(),
    daysInMonth: currentMonth.jDaysInMonth(),
    availableTimesInCurrentDay,
    selectedDay,
    setCurrentMonth,
    toggleDay,
    selectTime,
    changeMonth,
    selectedDate,
  };
}

function filterByMonth(dates: Moment[], month: number) {
  return dates.filter(
    (d) => d.jMonth() === month,
  );
}

function filterByDay(dates: Moment[], day: number) {
  return dates.filter(
    (d) => d.jDate() === day,
  );
}

function allDaysInMonth() {
  const days: number[] = [];
  for (let d = 1; d <= 31; d++) {
    days.push(d);
  }

  return days;
}
