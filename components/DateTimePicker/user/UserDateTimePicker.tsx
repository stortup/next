import { DatePickerUI } from "../DatePickerUI";
import { useDatePicker } from "./useUserDatePicker";
import moment, { Moment } from "jalali-moment";
import { PickerHeader, TimePicker } from "../TimePickerUI";
import { Row, Col } from "reactstrap";

export function UserDateTimePicker({
  availableDates,
  reservedDates,
  selectedDate,
  onDateSelected,
}: {
  availableDates: Date[] | string[];
  reservedDates: Date[] | string[];
  selectedDate: Date | string | null;
  onDateSelected: (date: Moment | null) => unknown;
}) {
  const {
    changeMonth,
    monthTitle,
    highlightedDays,
    startWeekday,
    daysInMonth,
    selectedDay,
    toggleDay,
    selectTime,
    availableTimes,
    reservedTimes,
    selectedTimes,
  } = useDatePicker({
    availableDates: availableDates.map((e) => moment(e)),
    reservedDates: reservedDates.map((e) => moment(e)),
    selectedDate: selectedDate ? moment(selectedDate) : null,
    onDateSelected,
  });

  return (
    <>
      <PickerHeader title={monthTitle} onMonthChange={changeMonth} />
      <Row>
        <Col md={9}>
          <DatePickerUI
            daysDisableByDefault
            selectedDays={selectedDay ? [selectedDay] : []}
            highlightedDays={highlightedDays}
            startWeekday={startWeekday}
            daysInMonth={daysInMonth}
            onDayClicked={toggleDay}
          />
        </Col>
        <Col md={3}>
          <TimePicker
            availableTimes={availableTimes}
            selectedTimes={selectedTimes}
            reservedTimes={reservedTimes}
            hidden={!selectedDay}
            onTimeClicked={selectTime}
          />
        </Col>
      </Row>
    </>
  );
}
