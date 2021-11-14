import { Loading } from "components/Loading";
import { ErrorHandler } from "components/ErrorHandler";
import { IMentorFull } from "types";
import useSWR from "swr";
import { BASE_URL, fetcher } from "client/client";
import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import moment from "jalali-moment";
import Link from "next/link";

interface Request {
  id: string;
  user_id: string;
  name: string;
  bio: string;
  bank_no: string;
  file_id: string;
}

function useMentoringRequests() {
  const { data, error, mutate } = useSWR<Request[]>(
    "/mentors/get_mentoring_requests",
    fetcher
  );

  async function confirm(id: string, user_id: string) {
    await fetcher(`/mentors/grant_mentoring_access`, { request_id: id });
    mutate((old) => {
      const newData = old!.filter((r) => r.user_id !== user_id);
      return newData;
    });
  }

  async function dismiss(id: string) {
    await fetcher(`/mentors/reject_mentoring_access`, { request_id: id });

    mutate((old) => {
      const newData = old!.filter((r) => r.id !== id);
      return newData;
    });
  }

  return { requests: data, error, confirm, dismiss };
}

export default function MentoringRequestsPage() {
  const { requests, error, confirm, dismiss } = useMentoringRequests();

  if (error) return <ErrorHandler error={error} />;
  if (!requests) return <Loading />;

  return (
    <Row className="row-cols-auto">
      <Col>
        {requests.map((r, i) => (
          <MentoringRequest
            key={i}
            onConfirm={() => confirm(r.id, r.user_id)}
            onDismiss={() => dismiss(r.id)}
            {...r}
          />
        ))}
      </Col>
    </Row>
  );
}

MentoringRequestsPage.dashboard = true;
MentoringRequestsPage.title = "درخواست های منتورینگ";

function MentoringRequest({
  onConfirm,
  onDismiss,
  name,
  bio,
  bank_no,
  file_id,
}: Request & { onConfirm: () => void; onDismiss: () => void }) {
  return (
    <Card className="shadow-sm" style={{ minWidth: 400 }}>
      <CardBody className="d-flex flex-column">
        <CardTitle className="mb-0 fw-bold">{name}</CardTitle>
        <CardText className="mb-1">{bio}</CardText>
        <CardText>شماره حساب: {bank_no}</CardText>
      </CardBody>
      <CardBody className="text-end">
        <div className="d-flex bd-highlight">
          <a
            className="me-auto"
            target="_blank"
            href={`${BASE_URL}/files/${file_id}`}
            rel="noreferrer"
          >
            <Button outline className="border-0">
              مشاهده رزومه
            </Button>
          </a>

          <Button outline className="me-2 border-0" onClick={onDismiss}>
            رد کردن
          </Button>
          <Button color="primary" onClick={onConfirm}>
            تایید
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
