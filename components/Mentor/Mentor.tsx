import React, { DOMAttributes, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import moment, { Moment } from "jalali-moment";
import { fa } from "utils/persian";
import styles from "../../styles/Mentors.module.css";
import { IMentor, ITime } from "types";
import { compareDates } from "components/DateTimePicker/utils";

export function Mentor({ id, name, bio, resume, times, avatar_url }: IMentor) {
  const [selectedTime, setTime] = useState<ITime | null>(null);

  return (
    <Col>
      <Card className="shadow-sm">
        <Row className="g-0">
          <Col sm={7} className="d-flex align-items-stretch">
            <CardBody className="d-flex flex-column">
              <Row>
                <Col className="col-auto">
                  {avatar_url && (
                    <Image
                      alt="avatar_url"
                      className="rounded-circle"
                      src={avatar_url}
                      width={50}
                      height={50}
                    />
                  )}
                </Col>
                <Col>
                  <CardTitle className="mb-0 fw-bold">{name}</CardTitle>
                  <CardText>{bio}</CardText>
                </Col>
              </Row>

              <CardText>{resume}</CardText>
              <Link
                href={`/mentors/${id}/reserve/?time=${
                  selectedTime ? new Date(selectedTime.date).toISOString() : ""
                }`}
                passHref
              >
                <Button
                  outline
                  color="primary"
                  className="mt-auto align-self-start"
                >
                  رزرو
                </Button>
              </Link>
            </CardBody>
          </Col>
          <Col sm={5}>
            <Times
              times={times}
              selectedTime={selectedTime}
              onSelect={setTime}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

function Time({
  date,
  selected,
  reserved,
  onClick,
}: ITime & {
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
  selected: boolean;
}) {
  const _date = moment(date).locale("fa");
  const HOUR_LABEL = "ساعت";
  const hourStart = _date.hours();
  const hourEnd = _date.clone().add(1, "hour").hours();
  const text = fa(
    `${_date.format("ddd D MMM")} - ${HOUR_LABEL} ${hourStart} تا ${hourEnd}`
  );

  const cn = reserved ? "text-decoration-line-through" : undefined;

  return (
    <ListGroupItem
      tag="button"
      active={selected}
      className={cn}
      style={{ fontSize: "0.85rem" }}
      disabled={reserved}
      onClick={onClick}
    >
      {text}
    </ListGroupItem>
  );
}

interface OnSelect {
  (time: ITime): unknown;
}

function Times({
  times,
  selectedTime,
  onSelect,
}: {
  times: ITime[];
  selectedTime: ITime | null;
  onSelect: OnSelect;
}) {
  console.log("selected", selectedTime);
  let firstDay: number | undefined;
  const list: React.ReactNode[] = [];

  let i = 0;
  for (const time of times) {
    let selected = false;

    if (selectedTime) {
      selected = compareDates(new Date(time.date), new Date(selectedTime.date));
    }

    list.push(
      <Time
        key={i}
        {...time}
        selected={selected}
        onClick={() => onSelect(time)}
      />
    );

    i++;
  }

  return (
    <div
      className={styles["time-scroll"]}
      style={{ overflowY: "scroll", maxHeight: "250px" }}
    >
      <ListGroup>{list}</ListGroup>
    </div>
  );
}
