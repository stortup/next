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
import { queryToString } from "utils/query";

export default function MentorsPage() {
  const router = useRouter();
  const search = queryToString(router.query.search);
  const category = queryToString(router.query.category);

  const { data, error } = useSWR<IMentor[]>(
    urlcat("/mentors/get_all_mentors", {
      category,
      search,
    }),
    fetcher
  );

  if (!data) return <Loading />;
  const hasResult = data.length > 0;

  return (
    <>
      <Categories current={category} />
      <SearchResult query={search} />
      <Row className="row-cols-1 row-cols-lg-2 g-3">
        {data.map((e, i) => (
          <Mentor key={i} {...e} />
        ))}
        {!hasResult && <NoResult />}
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

function SearchResult({ query }: { query?: string }) {
  if (!query) return null;

  const title = `نتایج جستجو برای "${query}"`;

  return (
    <div className="mt-1">
      <h4>{title}</h4>
    </div>
  );
}

function NoResult() {
  return (
    <div className="w-100 text-center mt-4">
      <h5 className="fw-light">نتیجه ای یافت نشد</h5>
    </div>
  );
}

MentorsPage.dashboard = true;
MentorsPage.searchBar = true;
MentorsPage.title = "منتور ها";
