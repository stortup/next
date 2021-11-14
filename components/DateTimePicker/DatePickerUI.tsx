import { Button, Table } from "reactstrap";
import { fa } from "utils/persian";

function Day({
  day,
  onClick,
  selected,
  disable,
  highlighted,
  outlined,
}: {
  day: number;
  selected?: boolean;
  highlighted?: boolean;
  disable?: boolean;
  outlined?: boolean;
  onClick: (day: number) => void;
}) {
  let color = "white";
  if (highlighted) color = "secondary";
  if (selected) color = "primary";
  if (outlined) color = "primary";

  return (
    <th className="text-center">
      <Button
        disabled={disable}
        outline={outlined}
        color={color}
        className="rounded-circle p-0"
        style={{ width: "40px", height: "40px" }}
        onClick={() => onClick(day)}
      >
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
      <p className="text-center mb-0">{text}</p>
    </th>
  );
}

function WeekDayHeader() {
  return (
    <tr>
      <DayLabel text="شنبه" />
      <DayLabel text="یک‌شنبه" />
      <DayLabel text="دوشنبه" />
      <DayLabel text="سه‌شنبه" />
      <DayLabel text="چهارشنبه" />
      <DayLabel text="پنجشنبه" />
      <DayLabel text="جمعه" />
    </tr>
  );
}

export function DatePickerUI({
  startWeekday,
  daysInMonth,
  onDayClicked,
  selectedDays,
  outlinedDays,
  highlightedDays,
  disabledDays,
}: {
  startWeekday: number;
  daysInMonth: number;
  onDayClicked: (day: number) => unknown;
  selectedDays: number[];
  highlightedDays: number[];
  disabledDays: number[];
  outlinedDays?: number[];
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
      } else if (outlinedDays?.includes(day)) {
        days.push(<Day outlined day={day} onClick={onDayClicked} />);
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
          backgroundColor: "#F8F9FA",
        }}
      >
        <WeekDayHeader />
      </thead>
      <tbody>{weeks}</tbody>
    </Table>
  );
}
