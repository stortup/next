import moment from "jalali-moment";
import React, { DOMAttributes, useState } from "react";
import styles from "../../styles/Mentors.module.css";
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

interface TimeProps {
  id: string;
  date: Date | string;
  reserved?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
}

interface ITime {
  id: string;
  date: Date | string;
  reserved?: boolean;
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
  const weekday = _date.format("ddd");
  const HOUR_LABEL = "ساعت";
  const hourStart = _date.hours();
  const hourEnd = _date.clone().add(1, "hour").hours();
  const text = `${weekday} ${HOUR_LABEL} ${hourStart} تا ${hourEnd}`;

  const cn = reserved ? "text-decoration-line-through" : undefined;

  return (
    <ListGroupItem
      tag="button"
      active={selected}
      className={cn}
      disabled={reserved}
      onClick={onClick}
    >
      {text}
    </ListGroupItem>
  );
}

interface OnSelect {
  (timeId: string): unknown;
}

function Times({
  times,
  selectedTime,
  onSelect,
}: {
  times: TimeProps[];
  selectedTime: string | null;
  onSelect: OnSelect;
}) {
  return (
    <Col sm={4}>
      <div
        className={styles["time-scroll"]}
        style={{ overflowY: "scroll", maxHeight: "250px" }}
      >
        <ListGroup>
          {times.map((p, i) => (
            <Time
              key={i}
              {...p}
              onClick={() => onSelect(p.id)}
              selected={p.id === selectedTime}
            />
          ))}
        </ListGroup>
      </div>
    </Col>
  );
}

interface MentorProps {
  name: string;
  bio: string;
  description: string;
  avatar: string;
  times: TimeProps[];
}

function Mentor({ name, bio, description, times, avatar }: MentorProps) {
  const [selectedTime, setTime] = useState<string | null>(null);

  return (
    <Col>
      <Card className="shadow-sm">
        <Row className="g-0">
          <Col sm={8} className="d-flex align-items-stretch">
            <CardBody className="d-flex flex-column">
              <Row>
                <Col className="col-auto">
                  <Image
                    alt="avatar"
                    className="rounded-circle"
                    src={avatar}
                    width={50}
                    height={50}
                  />
                </Col>
                <Col>
                  <CardTitle className="mb-0">{name}</CardTitle>
                  <CardText>{bio}</CardText>
                </Col>
              </Row>

              <CardText>{description}</CardText>
              <Button
                outline
                color="primary"
                href="#"
                className="mt-auto align-self-start"
              >
                رزرو
              </Button>
            </CardBody>
          </Col>
          <Times times={times} selectedTime={selectedTime} onSelect={setTime} />
        </Row>
      </Card>
    </Col>
  );
}

interface MentorsPageProps {
  mentors: MentorProps[];
}

const sample: MentorsPageProps = {
  mentors: [
    {
      name: "محمد علی مومن",
      bio: "فوق لیسانس لوله کشی",
      description: "توضیحی لازم ندره",
      avatar: "https://i.morioh.com/2021/07/31/bf74c9e9.webp",
      times: [
        { id: "1", date: new Date().toISOString() },
        { id: "2", date: new Date().toISOString(), reserved: true },
        { id: "3", date: new Date().toISOString() },
        { id: "4", date: new Date().toISOString() },
        { id: "5", date: new Date().toISOString() },
        { id: "6", date: new Date().toISOString() },
        { id: "7", date: new Date().toISOString() },
        { id: "8", date: new Date().toISOString() },
      ],
    },
    {
      name: "محمد علی مومن",
      bio: "فوق لیسانس لوله کشی",
      description: "توضیحی لازم ندره",
      avatar: "https://i.morioh.com/2021/07/31/bf74c9e9.webp",
      times: [
        { id: "1", date: new Date().toISOString() },
        { id: "2", date: new Date().toISOString(), reserved: true },
        { id: "3", date: new Date().toISOString() },
        { id: "4", date: new Date().toISOString() },
        { id: "5", date: new Date().toISOString() },
        { id: "6", date: new Date().toISOString() },
        { id: "7", date: new Date().toISOString() },
        { id: "8", date: new Date().toISOString() },
      ],
    },
  ],
};

export default function MentorsPage({ mentors }: MentorsPageProps) {
  return (
    <>
      <div className="row row-cols-1 row-cols-lg-2 g-3">
        {mentors.map((e, i) => (
          <Mentor key={i} {...e} />
        ))}
      </div>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: sample,
  };
}

MentorsPage.dashboard = true;
MentorsPage.title = "منتور ها";
