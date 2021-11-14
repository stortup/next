import { DatePickerUI } from "../DatePickerUI";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import styles from "../styles.module.css";
import { useDatePicker } from "./useUserDatePicker";
import { Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap";
import moment, { Moment } from "jalali-moment";
import { fa } from "utils/persian";

function TimePicker({
  hidden,
  availableTimes,
  selectedTime,
  onTimeClicked,
}: {
  hidden: boolean;
  availableTimes: number[];
  selectedTime: number | null;
  onTimeClicked: (time: number) => unknown;
}) {
  const times: JSX.Element[] = [];

  if (!hidden) {
    for (let i of availableTimes) {
      let className = "";
      // if (reserved) className += "disabled text-decoration-line-through";

      times.push(
        <ListGroupItem
          tag="button"
          active={selectedTime === i}
          onClick={() => onTimeClicked(i)}
        >
          {fa(`ساعت ${i} تا ${i + 1}`)}
        </ListGroupItem>
      );
    }
  }

  return (
    <div
      className={styles["time-scroll"]}
      style={{ maxHeight: 350, overflowY: "scroll" }}
    >
      <ListGroup>{times}</ListGroup>
    </div>
  );
}

function PickerHeader({
  title,
  onMonthChange,
}: {
  title: string;
  onMonthChange: (d: -1 | 1) => unknown;
}) {
  return (
    <div className="d-flex justify-content-between">
      <Button
        color="white"
        className="btn-link"
        onClick={() => onMonthChange(-1)}
      >
        <ArrowRight size={30} />
      </Button>
      <h2 className="text-center">{title}</h2>
      <Button
        color="white"
        className="btn-link"
        onClick={() => onMonthChange(1)}
      >
        <ArrowLeft size={30} />
      </Button>
    </div>
  );
}

export function UserDateTimePicker({
  availableDates,
  reservedDates,
  onDate,
}: {
  availableDates: Date[] | string[];
  reservedDates: Date[] | string[];
  selectedDate: Date | string | null;
  onDate: (date: Moment | null) => unknown;
}) {
  const {
    changeMonth,
    currentMonthTitle,
    highlightedDays,
    startWeekday,
    daysInMonth,
    selectedDay,
    toggleDay,
    selectedDate,
    selectTime,
    disabledDays,
    availableTimesInCurrentDay,
    reservedTimesInCurrentDay,
  } = useDatePicker({
    availableDates: availableDates.map((e) => moment(e)),
    reservedDates: reservedDates.map((e) => moment(e)),
    onDate,
  });

  return (
    <>
      <PickerHeader title={currentMonthTitle} onMonthChange={changeMonth} />
      <Row>
        <Col md={9}>
          <DatePickerUI
            selectedDays={selectedDay === null ? [] : [selectedDay]}
            disabledDays={disabledDays}
            highlightedDays={highlightedDays}
            startWeekday={startWeekday}
            daysInMonth={daysInMonth}
            onDayClicked={toggleDay}
          />
        </Col>
        <Col md={3}>
          <TimePicker
            availableTimes={availableTimesInCurrentDay}
            selectedTime={selectedDate?.hour() ?? null}
            hidden={!selectedDay}
            onTimeClicked={selectTime}
          />
        </Col>
      </Row>
    </>
  );
}
