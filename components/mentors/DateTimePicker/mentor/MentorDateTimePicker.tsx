import moment, { Moment } from "jalali-moment";
import { Col, Row } from "reactstrap";
import { DatePickerUI } from "../DatePickerUI";
import { PickerHeader, TimePicker } from "../TimePickerUI";
import { useKeyPress } from "./useKeyPress";
import { useDatePicker } from "./useMentorDatePicker";

export function MentorDateTimePicker({
  dates,
  reservedDates,
  setDates,
}: {
  dates: Moment[];
  reservedDates: Moment[];

  setDates: (n: Moment[]) => void;
}) {
  const ctrlPressed = useKeyPress("Control");

  const {
    changeMonth,
    monthTitle,
    selectedDays,
    highlightedDays,
    startWeekday,
    daysInMonth,
    toggleDay,
    selectedTimes,
    reservedTimes,
    toggleTime,
    disabledDays,
    outlinedDays,
  } = useDatePicker({
    dates,
    reservedDates: reservedDates,
    setDates,
    ctrlPressed,
  });

  return (
    <>
      <PickerHeader title={monthTitle} onMonthChange={changeMonth} />
      <Row>
        <Col md={9}>
          <DatePickerUI
            selectedDays={selectedDays}
            highlightedDays={highlightedDays}
            disabledDays={disabledDays}
            startWeekday={startWeekday}
            daysInMonth={daysInMonth}
            onDayClicked={toggleDay}
            outlinedDays={outlinedDays}
          />
        </Col>
        <Col md={3}>
          <TimePicker
            selectedTimes={selectedTimes}
            reservedTimes={reservedTimes}
            hidden={selectedDays.length < 1}
            onTimeClicked={toggleTime}
          />
        </Col>
      </Row>
    </>
  );
}
