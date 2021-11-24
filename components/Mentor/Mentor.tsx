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
import { Avatar } from "components/Avatar";

export function Mentor({ id, name, bio, resume, times, avatar_url }: IMentor) {
  const [selectedTime, setTime] = useState<ITime | null>(null);

  return (
    <Col className="d-flex align-items-stretch">
      <Card className="card-shadow w-100">
        <Row className="g-0 h-100">
          <Col sm={7}>
            <CardBody className="d-flex flex-column h-100">
              <Row>
                <Col className="col-auto">
                  <Avatar url={avatar_url} />
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
  return (
    <div
      className={styles["time-scroll"]}
      style={{ overflowY: "scroll", maxHeight: "250px" }}
    >
      <ListGroup>
        {times.map((time, i) => {
          let selected = false;

          if (selectedTime) {
            selected = compareDates(
              new Date(time.date),
              new Date(selectedTime.date)
            );
          }

          return (
            <Time
              key={i}
              {...time}
              selected={selected}
              onClick={() => onSelect(time)}
            />
          );
        })}
      </ListGroup>
    </div>
  );
}
