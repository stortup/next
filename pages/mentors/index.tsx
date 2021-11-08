import React from "react";
import Link from "next/link";
import { Mentor } from "components/Mentor/Mentor";
import { fetcher } from "client/client";
import useSWR from "swr";
import { Row, Badge } from "reactstrap";
import { IMentor } from "types";
import { allCategories } from "categories";
import { Loading } from "components/Loading";
import { useRouter } from "next/router";
import urlcat from "urlcat";

export default function MentorsPage() {
  const router = useRouter();
  const { data, error } = useSWR<IMentor[]>(
    urlcat("/mentors/get_all_mentors", { category: router.query.category }),
    fetcher
  );

  if (!data) return <Loading />;

  return (
    <>
      <Categories current={router.query.category as string} />
      <Row className="row-cols-1 row-cols-lg-2 g-3">
        {data.map((e, i) => (
          <Mentor key={i} {...e} />
        ))}
      </Row>
    </>
  );
}

function Categories({ current }: { current?: string }) {
  return (
    <div className="pb-3">
      {allCategories.map((e, i) => (
        <Link key={i} href={{ query: { category: e.id } }} passHref>
          <Badge
            pill
            id={e.id}
            style={{ width: 100 }}
            color={e.id === current ? "info" : "secondary"}
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
