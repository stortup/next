import { Button, Table } from "reactstrap";

function Day({
  day,
  onClick,
  selected,
  highlighted,
}: {
  day: number;
  selected?: boolean;
  highlighted?: boolean;
  onClick: (day: number) => void;
}) {
  let color = "";
  if (highlighted) color = "secondary";
  if (selected) color = "primary";

  return (
    <th className="text-center">
      <Button color={color} onClick={() => onClick(day)}>
        {day.toString()}
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
        days.push(<Day selected day={day} onClick={onDayClicked} />);
      } else if (highlightedDays.includes(day)) {
        days.push(<Day highlighted day={day} onClick={onDayClicked} />);
      } else {
        days.push(<Day day={day} onClick={onDayClicked} />);
      }
    }

    if (days.length === 0) continue;
    weeks.push(<tr>{days}</tr>);
  }

  return (
    <Table size="sm">
      <thead>
        <WeekDayHeader />
      </thead>
      <tbody>{weeks}</tbody>
    </Table>
  );
}
