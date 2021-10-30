import { DatePicker } from "./DatePicker";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { getFirstDayOfMonth } from "./utils";
import moment, { Moment } from "jalali-moment";
import { without } from "ramda";
import { useDatePicker } from "./useDatePicker";
import styles from "./styles.module.css";

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
      let cn = "list-group-item";
      if (selectedTimes.includes(i)) cn += " active";
      // if (reserved) cn += " disabled text-decoration-line-through";

      times.push(
        <button className={cn} onClick={() => onTimeClicked(i)}>
          ساعت {i}
        </button>
      );
    }
  }

  return (
    <div
      className={styles["time-scroll"]}
      style={{ maxHeight: 400, overflowY: "scroll" }}
    >
      <div className="list-group">{times}</div>
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
      <button className="btn" onClick={() => onMonthChange(-1)}>
        <ArrowRight size={30} />
      </button>
      <h2 className="text-center">{title}</h2>
      <button className="btn" onClick={() => onMonthChange(1)}>
        <ArrowLeft size={30} />
      </button>
    </div>
  );
}

function useKeyPress(targetKey: string) {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  function downHandler({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
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
    <div className="card">
      <PickerHeader title={currentMonthTitle} onMonthChange={changeMonth} />
      <div className="row">
        <div className="col-md-9">
          <DatePicker
            selectedDays={selectedDays}
            highlightedDays={highlightedDays}
            startWeekday={startWeekday}
            daysInMonth={daysInMonth}
            onDayClicked={toggleDay}
          />
        </div>
        <div className="col-md-3">
          <TimePicker
            selectedTimes={selectedTimes}
            hidden={selectedDays.length < 1}
            onTimeClicked={toggleTime}
          />
        </div>
      </div>
    </div>
  );
}
