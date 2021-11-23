import { Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap";
import { fa } from "utils/persian";
import styles from "./styles.module.css";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

export function TimePicker({
  hidden,
  availableTimes,
  selectedTimes,
  reservedTimes,
  onTimeClicked,
}: {
  hidden: boolean;
  availableTimes?: number[];
  reservedTimes?: number[];
  selectedTimes: number[];
  onTimeClicked: (time: number) => unknown;
}) {
  const times: JSX.Element[] = [];
  reservedTimes = reservedTimes ?? [];

  if (!hidden) {
    for (let i of availableTimes ?? allAvailableTimes) {
      let className = "";
      const reserved = reservedTimes.includes(i);
      let active = selectedTimes.includes(i);

      if (reserved) {
        className += "text-decoration-line-through";
        active = false;
      }

      times.push(
        <ListGroupItem
          className={className}
          tag="button"
          disabled={reserved}
          active={active}
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

export function PickerHeader({
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

const allAvailableTimes = [
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
];
