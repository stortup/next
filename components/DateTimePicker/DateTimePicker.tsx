import styles from "./DateTimePicker.module.css";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { getFirstDayOfMonth } from "./utils";
import moment, { Moment } from "jalali-moment";
import { without } from "ramda";

function DayLabel({ text }: { text: string }) {
  return (
    <div className="col">
      <p className="text-center" style={{ width: 46, height: 46 }}>
        {text}
      </p>
    </div>
  );
}

function Day({
  day,
  onClick,
  type,
}: {
  day: number;
  type?: "selected" | "highlighted";
  onClick: (day: number) => void;
}) {
  let cls = "btn";
  if (type === "selected") cls += " btn-primary";
  else if (type === "highlighted") cls += " btn-secondary";

  return (
    <div className="col">
      <button
        className={`${cls} ${styles.day}`}
        style={{ width: 46, height: 46 }}
        onClick={() => onClick(day)}
      >
        {day.toString()}
      </button>
    </div>
  );
}

function DisableDay() {
  return (
    <div className="col">
      <button disabled={true} className="btn btn-light">
        {" "}
      </button>
    </div>
  );
}

function DatePicker({
  startIndex,
  daysInMonth,
  onDayClicked,
  selectedDays,
  highlightedDays,
}: {
  startIndex: number;
  daysInMonth: number;
  onDayClicked: (day: number) => unknown;
  selectedDays: number[];
  highlightedDays: number[];
}) {
  const weeks: JSX.Element[] = [];

  for (let w = 0; w < 6; w++) {
    const days: JSX.Element[] = [];
    for (let d = 0; d < 7; d++) {
      const day = w * 7 + 1 + d + startIndex;
      if (day < 1 || day > daysInMonth) {
        days.push(<DisableDay />);
      } else if (selectedDays.includes(day)) {
        days.push(<Day type="selected" day={day} onClick={onDayClicked} />);
      } else if (highlightedDays.includes(day)) {
        days.push(<Day type="highlighted" day={day} onClick={onDayClicked} />);
      } else {
        days.push(<Day day={day} onClick={onDayClicked} />);
      }
    }
    weeks.push(<div className="row">{days}</div>);
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <DayLabel text="ش" />
          <DayLabel text="ی" />
          <DayLabel text="د" />
          <DayLabel text="س" />
          <DayLabel text="چ" />
          <DayLabel text="پ" />
          <DayLabel text="ج" />
        </div>
      </div>
      <div className="container">{weeks}</div>
    </div>
  );
}

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
      const cls = selectedTimes.includes(i)
        ? "btn btn-primary"
        : "btn btn-light";

      times.push(
        <button className={cls} onClick={() => onTimeClicked(i)}>
          ساعت {i}
        </button>
      );
    }
  }

  return (
    <div
      className={styles["time-scroll"]}
      style={{ height: 300, overflowY: "scroll" }}
    >
      <div className="d-grid">{times}</div>
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
    console.log(key);
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

export function DateTimePicker() {
  const [selectedDates, setSelectedDates] = useState<Moment[]>([]);
  const [month, setMonth] = useState(getFirstDayOfMonth());
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  // const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

  const multi = useKeyPress("Control");

  const highlightedDays: number[] = selectedDates
    .filter((d) => d.jMonth() === month.jMonth())
    .map((d) => d.jDate());

  let selectedTimes: number[] = [];

  if (selectedDays.length > 0) {
    const sDay = selectedDays[0];
    selectedTimes = selectedDates
      .filter((d) => d.jMonth() === month.jMonth())
      .filter((d) => d.jDate() === sDay)
      .map((d) => d.hour());
  }

  return (
    <div className="card">
      <PickerHeader
        title={month.locale("fa").format("MMMM")}
        onMonthChange={(v) => {
          setMonth(month.clone().add(v, "months"));
          setSelectedDays([]);
        }}
      />
      <div className="d-flex justify-content-start">
        <DatePicker
          selectedDays={selectedDays}
          highlightedDays={highlightedDays}
          startIndex={-month.jDay()}
          daysInMonth={month.jDaysInMonth()}
          onDayClicked={(dayInMonth) => {
            const day = month.clone().add(dayInMonth, "days");

            if (multi) {
              if (selectedDays.includes(dayInMonth)) {
                setSelectedDays(without([dayInMonth], selectedDays));
                return;
              }
              setSelectedDays([...selectedDays, dayInMonth]);
              return;
            }

            setSelectedDays([dayInMonth]);
          }}
        />
        <TimePicker
          selectedTimes={selectedTimes}
          hidden={selectedDays.length < 1}
          onTimeClicked={(time) => {
            if (selectedDays.length === 0) return;
            let newDates = [...selectedDates];
            for (const selectedDay of selectedDays) {
              const date = month.clone().jDate(selectedDay).hour(time);
              if (!includes(selectedDates, date)) {
                newDates.push(date);
              } else {
                if (selectedDays.length === 1) {
                  newDates = withoutDate(newDates, date);
                }
              }
            }
            setSelectedDates(newDates);
          }}
        />
      </div>
    </div>
  );
}

function includes(dates: Moment[], date: Moment): boolean {
  for (const d of dates) {
    if (d.isSame(date)) return true;
  }

  return false;
}

function withoutDate(dates: Moment[], date: Moment): Moment[] {
  const newDates: Moment[] = [];
  for (const d of dates) {
    if (!d.isSame(date)) newDates.push(d);
  }

  return newDates;
}
