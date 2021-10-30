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
    <th>
      <button
        className={cls}
        style={{ width: 46, height: 46 }}
        onClick={() => onClick(day)}
      >
        {day.toString()}
      </button>
    </th>
  );
}

function NullDay() {
  return <th></th>;
}

function DayLabel({ text }: { text: string }) {
  return (
    <th>
      <p className="text-center" style={{ width: 46, height: 46 }}>
        {text}
      </p>
    </th>
  );
}

function WeekDayHeader() {
  return (
    <tr>
      <DayLabel text="ش" />
      <DayLabel text="ی" />
      <DayLabel text="د" />
      <DayLabel text="س" />
      <DayLabel text="چ" />
      <DayLabel text="پ" />
      <DayLabel text="ج" />
    </tr>
  );
}

export function DatePicker({
  startWeekday,
  daysInMonth,
  onDayClicked,
  selectedDays,
  highlightedDays,
}: {
  startWeekday: number;
  daysInMonth: number;
  onDayClicked: (day: number) => unknown;
  selectedDays: number[];
  highlightedDays: number[];
}) {
  const weeks: JSX.Element[] = [];

  for (let w = 0; w < 6; w++) {
    const days: JSX.Element[] = [];
    for (let d = 0; d < 7; d++) {
      const day = w * 7 + 1 + d - startWeekday;
      if (day < 1 || day > daysInMonth) {
        days.push(<NullDay />);
      } else if (selectedDays.includes(day)) {
        days.push(<Day type="selected" day={day} onClick={onDayClicked} />);
      } else if (highlightedDays.includes(day)) {
        days.push(<Day type="highlighted" day={day} onClick={onDayClicked} />);
      } else {
        days.push(<Day day={day} onClick={onDayClicked} />);
      }
    }

    if (days.length === 0) continue;
    weeks.push(<tr>{days}</tr>);
  }

  return (
    <table className="table table-sm">
      <thead>
        <WeekDayHeader />
      </thead>
      <tbody>{weeks}</tbody>
    </table>
  );
}
