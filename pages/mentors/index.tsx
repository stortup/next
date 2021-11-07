import React from "react";
import Link from "next/link";
import { Mentor } from "components/Mentor/Mentor";
import { fetcher } from "client/client";
import useSWR from "swr";
import { Row, Badge } from "reactstrap";
import { IMentor } from "types";
import { allCategories } from "categories";

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
      <Categories />
      <Row className="row-cols-1 row-cols-lg-2 g-3">
        {data.map((e, i) => (
          <Mentor key={i} {...e} />
        ))}
      </Row>
    </>
  );
}

function Categories() {
  return (
    <div className="pb-3">
      {allCategories.map((e, i) => (
        <Link key={i} href="/" passHref>
          <Badge
            pill
            id={e.id}
            style={{ width: 100 }}
            color="info"
            className="fs-6 p-2 me-2"
          >
            {e.label}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

MentorsPage.dashboard = true;
MentorsPage.title = "منتور ها";
