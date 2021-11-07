import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "client/client";
import { Loading } from "components/Loading";
import { ErrorHandler } from "components/ErrorHandler";
import moment from "jalali-moment";
import { fa } from "utils/persian";

type Meet = {
  id: string;
  date: Date;
  duration: number;
  peer: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    avatar_url: string | null;
  };
};

export default function MyMeetsPage() {
  const { data: meets, error } = useSWR<Meet[]>(
    "/mentors/get_my_meets",
    fetcher
  );

  if (!meets) return <Loading />;
  if (error) return <ErrorHandler error={error} />;

  return <>{meets.map(Meet)}</>;
}

MyMeetsPage.dashboard = true;
MyMeetsPage.title = "قرارهای ملاقات من";

function Meet({ peer, date }: Meet) {
  return (
    <Card className="shadow-sm">
      <Row className="g-0">
        <Col sm={6} className="d-flex align-items-stretch">
          <CardBody className="d-flex flex-column">
            <Row>
              {peer.avatar_url && (
                <Col className="col-auto">
                  <Image
                    alt="avatar_url"
                    className="rounded-circle"
                    src={peer.avatar_url}
                    width={50}
                    height={50}
                  />
                </Col>
              )}
              <Col>
                <CardTitle className="mb-0 fs-5 fw-bold">{peer.name}</CardTitle>
                <CardText>{peer.bio ?? ""}</CardText>
              </Col>
            </Row>

            <CardText>{`راه ارتباطی: ${peer.email}`}</CardText>
          </CardBody>
        </Col>
        <Col sm={6}>
          <CardBody className="d-flex flex-column text-end">
            <CardText className="mb-1">
              {fa(moment(date).locale("fa").format("YYYY/MM/DD"))}
            </CardText>
            <CardText>
              {fa(moment(date).locale("fa").format("ddd hh:mm A "))}
            </CardText>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
}
