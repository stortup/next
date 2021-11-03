import { Button, Table } from "reactstrap";
import { fa } from "utils/persian";

function Day({
  day,
  onClick,
  selected,
  disable,
  highlighted,
}: {
  day: number;
  selected?: boolean;
  highlighted?: boolean;
  disable?: boolean;
  onClick: (day: number) => void;
}) {
  let color = "";
  if (highlighted) color = "secondary";
  if (selected) color = "primary";

  return (
    <th className="text-center">
      <Button disabled={disable} color={color} onClick={() => onClick(day)}>
        {fa(day)}
      </Button>
    </th>
  );
}

function NullDay() {
  return <th></th>;
}

function DayLabel({ text }: { text: string }) {
  return (
    <th>
      <p className="text-center">{text}</p>
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

export function DatePickerUI({
  startWeekday,
  daysInMonth,
  onDayClicked,
  selectedDays,
  highlightedDays,
  disabledDays,
}: {
  startWeekday: number;
  daysInMonth: number;
  onDayClicked: (day: number) => unknown;
  selectedDays: number[];
  highlightedDays: number[];
  disabledDays: number[];
}) {
  const weeks: JSX.Element[] = [];

  for (let w = 0; w < 6; w++) {
    const days: JSX.Element[] = [];
    let nNulls: number = 0;

    for (let d = 0; d < 7; d++) {
      const day = w * 7 + 1 + d - startWeekday;

      if (day < 1 || day > daysInMonth) {
        days.push(<NullDay />);
        nNulls++;
      } else if (selectedDays.includes(day)) {
        days.push(<Day selected day={day} onClick={onDayClicked} />);
      } else if (disabledDays.includes(day)) {
        days.push(<Day disable day={day} onClick={onDayClicked} />);
      } else if (highlightedDays.includes(day)) {
        days.push(<Day highlighted day={day} onClick={onDayClicked} />);
      } else {
        days.push(<Day day={day} onClick={onDayClicked} />);
      }
    }

    if (nNulls > 6) continue;
    weeks.push(<tr>{days}</tr>);
  }

  return (
    <Table size="sm" style={{ borderRadius: 10, overflow: "hidden" }}>
      <thead
        style={{
          color: "#000",
          backgroundColor: "#eee",
          borderStyle: "none",
        }}
      >
        <WeekDayHeader />
      </thead>
      <tbody>{weeks}</tbody>
    </Table>
  );
}
