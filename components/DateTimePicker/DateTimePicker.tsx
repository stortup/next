import { DatePicker } from "./DatePicker";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import styles from "./styles.module.css";
import { useDatePicker } from "./useDatePicker";
import { useKeyPress } from "./useKeyPress";
import { Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap";

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

  if (!hidden) {
    for (let i = 8; i < 19; i++) {
      // if (reserved) cn += " disabled text-decoration-line-through";

      times.push(
        <ListGroupItem
          tag="button"
          active={selectedTimes.includes(i)}
          onClick={() => onTimeClicked(i)}
        >
          ساعت {i}
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

export function DateTimePicker(props: { multi?: boolean }) {
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
  } = useDatePicker([], {
    ctrlPressed,
    multi: props.multi || false,
  });

  return (
    <>
      <PickerHeader title={currentMonthTitle} onMonthChange={changeMonth} />
      <Row>
        <Col md={9}>
          <DatePicker
            selectedDays={selectedDays}
            highlightedDays={highlightedDays}
            startWeekday={startWeekday}
            daysInMonth={daysInMonth}
            onDayClicked={toggleDay}
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
