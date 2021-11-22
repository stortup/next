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

function CoursesPage() {
  const a: number[] = new Array(10).fill(0);
  return (
    <>
      <Row>
        {a.map((item, index) => (
          <Col key={index} lg={4} md={6} sm={12} xs={12} className="g-3">
            <Course id={index.toString()} />
          </Col>
        ))}
      </Row>
    </>
  );
}

CoursesPage.title = "دوره ها";
CoursesPage.dashboard = true;

export default CoursesPage;

function Course({ id }: { id: string }) {
  console.log(id);
  return (
    <Card
      style={{ backgroundColor: "#fefefe" }}
      className="card-shadow p-0 mb-5 border-0 rounded"
    >
      <Link href={`/courses/${id}`} passHref>
        <a className="color-none">
          <Image alt="title" src={cardPicture} className="card-img-top" />
          <CardBody>
            <CardTitle tag="h5">جذب سرمایه هوشمند</CardTitle>
            <CardText>
              جذب سرمایه هوشمندشما در این آموزش با اصول پایه ای جذب سرمایه
              ومذاکره با سرمایه گذار آشنا می‌شوید
            </CardText>
          </CardBody>
        </a>
      </Link>

      <CardFooter className="bg-white">
        <div className="d-flex flex-row">
          <SampleLogo />

          <div>
            <CardTitle tag="h6" className="mb-1">
              صد استارتاپ
            </CardTitle>
            <CardSubtitle>سرمایه گذار خطر پذیر</CardSubtitle>
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
