import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  CardText,
  CardFooter,
} from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import cardPicture from "public/a.png";
import { useRouter } from "next/router";
import { queryToString } from "utils/query";
import useSWR from "swr";
import { fetcher } from "client/client";
import urlcat from "urlcat";
import { Loading } from "components/Loading";

interface Course {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    bio: string;
  };
}

function CoursesPage() {
  const router = useRouter();
  const search = queryToString(router.query.search);

  const { data, error } = useSWR<Course[]>(
    urlcat("/courses/get_all_courses", {
      search,
    }),
    fetcher
  );

  if (!data) return <Loading />;
  const hasResult = data.length > 0;

  return (
    <>
      <SearchResult query={search} />

      <Row>
        {data.map((item, index) => (
          <Col key={index} lg={4} md={6} sm={12} xs={12} className="g-3">
            <Course {...item} />
          </Col>
        ))}
        {!hasResult && <NoResult />}
      </Row>
    </>
  );
}

CoursesPage.title = "دوره ها";
CoursesPage.dashboard = true;
CoursesPage.searchBar = true;

export default CoursesPage;

function Course({ id, title, description, creator }: Course) {
  return (
    <Card
      style={{ backgroundColor: "#fefefe" }}
      className="card-shadow p-0 mb-5 rounded"
    >
      <Link href={`/courses/${id}`} passHref>
        <a className="color-none">
          <Image alt="title" src={cardPicture} className="card-img-top" />
          <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <CardText>{description}</CardText>
          </CardBody>
        </a>
      </Link>

      <CardFooter className="bg-white">
        <div className="d-flex flex-row">
          <SampleLogo />

          <div>
            <CardTitle tag="h6" className="mb-1">
              {creator.name}
            </CardTitle>
            <CardSubtitle>{creator.bio}</CardSubtitle>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function SampleLogo() {
  return (
    <div
      className="me-2"
      style={{
        width: 40,
        height: 40,
        backgroundColor: "#ddbb11",
      }}
    ></div>
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
