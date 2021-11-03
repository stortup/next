import React from "react";
import { Mentor } from "components/Mentor/Mentor";
import { fetcher } from "client/client";
import useSWR from "swr";
import { Row } from "reactstrap";
import { IMentor } from "types";

export default function MentorsPage() {
  const { data, error } = useSWR<IMentor[]>(
    "/mentors/get_all_mentors",
    fetcher
  );

  if (!data) {
    return <div>صبر کنید...</div>;
  }

  return (
    <>
      <Row className="row-cols-1 row-cols-lg-2 g-3">
        {data.map((e, i) => (
          <Mentor key={i} {...e} />
        ))}
      </Row>
    </>
  );
}

MentorsPage.dashboard = true;
MentorsPage.title = "منتور ها";
