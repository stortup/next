import { DatePickerUI } from "../DatePickerUI";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import styles from "../styles.module.css";
import { useDatePicker } from "./useMentorDatePicker";
import { useKeyPress } from "./useKeyPress";
import { Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap";
import { Moment } from "jalali-moment";
import { fa } from "utils/persian";

function TimePicker({
  hidden,
  selectedTimes,
  onTimeClicked,
}: {
  hidden: boolean;
  selectedTimes: number[];
  onTimeClicked: (time: number) => unknown;
}) {
  const times: JSX.Element[] = [];

  if (hidden) {
    return (
      <div className="d-flex aligns-items-center h-100 border rounded">
        <div className="row justify-content-center align-self-center w-100">
          <p className="text-center">تاریخی را انتخاب نکرده اید</p>
        </div>
      </div>
    );
  }

  for (let i = 8; i < 19; i++) {
    // if (reserved) cn += " disabled text-decoration-line-through";

    times.push(
      <ListGroupItem
        tag="button"
        active={selectedTimes.includes(i)}
        onClick={() => onTimeClicked(i)}
      >
        {fa(`ساعت ${i} تا ${i + 1}`)}
      </ListGroupItem>
    );
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
    <div className="d-flex justify-content-between p-3">
      <Button color="" onClick={() => onMonthChange(-1)}>
        <ArrowRight size={30} />
      </Button>
      <h2 className="text-center">{title}</h2>
      <Button color="" onClick={() => onMonthChange(1)}>
        <ArrowLeft size={30} />
      </Button>
    </div>
  );
}

export function MentorDateTimePicker({
  dates,
  setDates,
}: {
  dates: Moment[];
  setDates: (n: Moment[]) => void;
}) {
  const ctrlPressed = useKeyPress("Control");

  const {
    changeMonth,
    currentMonthTitle,
    selectedDays,
    highlightedDays,
    startWeekday,
    daysInMonth,
    toggleDay,
    selectedTimes,
    toggleTime,
    disabledDays,
    outlinedDays,
  } = useDatePicker({
    dates,
    setDates,
    ctrlPressed,
  });

  return (
    <>
      <PickerHeader title={currentMonthTitle} onMonthChange={changeMonth} />
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
            hidden={selectedDays.length < 1}
            onTimeClicked={toggleTime}
          />
        </Col>
      </Row>
    </>
  );
}
