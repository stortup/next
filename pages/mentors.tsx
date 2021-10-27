import moment from "jalali-moment";
import type { NextPage } from "next";
import React, { ReactElement } from "react";
import { Dashboard } from "../layouts/dashboard";
import styles from "../styles/Mentors.module.css";

interface TimeProps {
  date: Date | string;
  selected?: boolean;
  reserved?: boolean;
}

function Time({ date, selected, reserved }: TimeProps) {
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
    <button className={cn} disabled={reserved}>
      {text}
    </button>
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
  const timesElement = times.map((p, i) => <Time key={i} {...p} />);
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-sm-8">
            <div className="card-body">
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
            </div>
          </div>
          <div className="col-sm-4">
            <div
              className={styles["time-scroll"]}
              style={{ maxHeight: 200, overflowY: "scroll" }}
            >
              <div className="list-group">{timesElement}</div>
            </div>
          </div>
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
        { date: new Date().toISOString() },
        { date: new Date().toISOString(), reserved: true },
        { date: new Date().toISOString() },
        { date: new Date().toISOString() },
        { date: new Date().toISOString() },
        { date: new Date().toISOString() },
        { date: new Date().toISOString() },
        { date: new Date().toISOString() },
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
