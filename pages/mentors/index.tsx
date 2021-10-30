import moment from "jalali-moment";
import type { NextPage } from "next";
import React, { DOMAttributes, ReactElement, useState } from "react";
import styles from "../../styles/Mentors.module.css";

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

  let cn = "list-group-item";
  if (selected) cn += " active";
  if (reserved) cn += " disabled text-decoration-line-through";

  return (
    <button className={cn} disabled={reserved} onClick={onClick}>
      {text}
    </button>
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
    <div className="col-sm-4">
      <div
        className={styles["time-scroll"]}
        style={{ overflowY: "scroll", maxHeight: "250px" }}
      >
        <div className="list-group">
          {times.map((p, i) => (
            <Time
              key={i}
              {...p}
              onClick={() => onSelect(p.id)}
              selected={p.id === selectedTime}
            />
          ))}
        </div>
      </div>
    </div>
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
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-sm-8 d-flex align-items-stretch">
            <div className="card-body d-flex flex-column">
              <div className="row">
                <div className="col-auto">
                  <img
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                    src={avatar}
                  />
                </div>
                <div className="col">
                  <h5 className="card-title mb-0">{name}</h5>
                  <p className="card-text">{bio}</p>
                </div>
              </div>

              <p className="card-text">{description}</p>
              <a
                href="#"
                className="btn btn-outline-primary mt-auto align-self-start"
              >
                رزرو
              </a>
            </div>
          </div>
          <Times times={times} selectedTime={selectedTime} onSelect={setTime} />
        </div>
      </div>
    </div>
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
